import { existsSync, readFileSync } from "node:fs";
import { extractSitemapUrls, fetchText, getArgValue, getSiteConfig, hasFlag, toAbsoluteUrl } from "./seo-utils.mjs";

const site = getSiteConfig();
const siteUrl = getArgValue("--site", site.url).replace(/\/$/, "");
const limit = Number(getArgValue("--limit", "20"));
const shouldSubmit = hasFlag("--submit");
const googleKeyPath = getArgValue("--google-key", "D:/env/cursorai-451704-85a5abbe8eeb.json");
const indexNowKey = getArgValue("--indexnow-key", process.env.INDEXNOW_KEY ?? "");

const sitemap = await fetchText(toAbsoluteUrl(siteUrl, "/sitemap.xml"));
if (!sitemap.ok) {
  throw new Error(`sitemap fetch failed: ${sitemap.status}`);
}

const urls = extractSitemapUrls(sitemap.text)
  .sort((a, b) => new Date(b.lastmod || 0).getTime() - new Date(a.lastmod || 0).getTime())
  .slice(0, limit)
  .map((item) => item.loc);

console.log(`${shouldSubmit ? "submitting" : "dry-run"} indexing URLs: ${urls.length}`);
for (const url of urls) {
  console.log(url);
}

if (!shouldSubmit) {
  console.log("dry-run only. Add --submit after deployment to notify Google Indexing API, Bing IndexNow, and Naver IndexNow.");
} else {
  await submitGoogle(urls, googleKeyPath);
  if (indexNowKey) {
    await submitIndexNow(urls, "https://www.bing.com/indexnow", indexNowKey);
    await submitIndexNow(urls, "https://searchadvisor.naver.com/indexnow", indexNowKey);
  } else {
    console.warn("INDEXNOW_KEY is missing. Skipped Bing/Naver IndexNow submission.");
  }
}

async function submitGoogle(targetUrls, keyPath) {
  const key = JSON.parse(readFileSync(keyPath, "utf8"));
  const jwt = await createServiceAccountJwt(key);
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Google token failed: ${tokenResponse.status} ${await tokenResponse.text()}`);
  }

  const { access_token: accessToken } = await tokenResponse.json();
  for (const url of targetUrls) {
    const response = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });

    console.log(`google ${response.status} ${url}`);
  }
}

async function submitIndexNow(targetUrls, endpoint, key) {
  const keyFile = `public/${key}.txt`;
  if (!existsSync(keyFile)) {
    console.warn(`IndexNow key file is missing: ${keyFile}`);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: targetUrls,
    }),
  });

  console.log(`${endpoint} ${response.status}`);
}

async function createServiceAccountJwt(key) {
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const claim = base64Url(
    JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const data = `${header}.${claim}`;
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(key.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(data));
  return `${data}.${base64Url(signature)}`;
}

function pemToArrayBuffer(pem) {
  const base64 = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  return Uint8Array.from(Buffer.from(base64, "base64")).buffer;
}

function base64Url(value) {
  const buffer =
    typeof value === "string"
      ? Buffer.from(value)
      : Buffer.from(value instanceof ArrayBuffer ? new Uint8Array(value) : value);
  return buffer.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
