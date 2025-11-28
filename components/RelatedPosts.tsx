import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen } from 'lucide-react';

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  currentSlug: string;
  type: 'blog' | 'guide';
}

export default function RelatedPosts({ posts, currentSlug, type }: RelatedPostsProps) {
  // Filter out current post and limit to 3 items
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 p-2 rounded-full">
          <BookOpen className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">관련 글 더보기</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/${type}/${post.slug}`} className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <CardTitle className="text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-2">
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  읽어보기 <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
