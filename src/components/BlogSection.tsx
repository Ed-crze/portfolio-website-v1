import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import SectionHeader from './SectionHeader';
import { motion } from 'motion/react';

interface Post {
  id: string;
  title: string;
  content: string;
  status: 'published' | 'draft';
  tags: string[];
  userId: string;
  createdAt?: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function BlogSection() {
  const { isAdmin, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);
  
  useEffect(() => {
    let q;
    const postsRef = collection(db, 'posts');
    if (isAdmin) {
      q = query(postsRef, orderBy('createdAt', 'desc'));
    } else {
      q = query(postsRef, where('status', '==', 'published'), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const p: Post[] = [];
      snapshot.forEach(doc => {
        p.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(p);
    }, (error) => {
      console.error('Error fetching posts:', error);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentPost?.title || !currentPost?.content) return;

    const data = {
      title: currentPost.title,
      content: currentPost.content,
      status: currentPost.status || 'draft',
      tags: currentPost.tags || [],
      userId: user!.uid,
    };

    try {
      if (currentPost.id) {
        await updateDoc(doc(db, 'posts', currentPost.id), {
          ...data,
          // Not updating createdAt
        });
      } else {
        await addDoc(collection(db, 'posts'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      setIsEditing(false);
      setCurrentPost(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SectionHeader number="03" title="Journal">
      {isAdmin && !isEditing && (
        <button 
          onClick={() => { setIsEditing(true); setCurrentPost({ status: 'draft', tags: [] }); }}
          className="mb-12 border border-border px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        >
          + New Entry
        </button>
      )}

      {isEditing && currentPost && (
        <form onSubmit={handleSave} className="mb-16 border border-border p-8 bg-white/5 space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
            <h3 className="font-sans text-xl tracking-[-0.02em]">Editor</h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-[10px] text-meta uppercase tracking-[0.2em] hover:text-white">Cancel</button>
          </div>
          
          <input
            type="text"
            placeholder="Title"
            className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-white font-sans text-2xl"
            value={currentPost.title || ''}
            onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
            required
          />
          
          <textarea
            placeholder="Content..."
            rows={10}
            className="w-full bg-transparent border border-border p-4 focus:outline-none focus:border-white font-sans text-lg leading-relaxed resize-y"
            value={currentPost.content || ''}
            onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
            required
          />
          
          <div className="flex flex-wrap gap-6 items-center">
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-white text-sm w-64"
              value={currentPost.tags?.join(', ') || ''}
              onChange={e => setCurrentPost({...currentPost, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
            />
            
            <select
              className="bg-transparent border border-border p-2 text-sm text-meta focus:outline-none"
              value={currentPost.status}
              onChange={e => setCurrentPost({...currentPost, status: e.target.value as 'published'|'draft'})}
            >
              <option value="draft" className="bg-black text-white">Draft</option>
              <option value="published" className="bg-black text-white">Published</option>
            </select>
          </div>
          
          <button type="submit" className="border border-border px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors mt-6">
            Save Entry
          </button>
        </form>
      )}

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-10%" }}
        className="space-y-0 border-t border-border mt-8"
      >
        {posts.length === 0 && !isEditing && (
          <p className="py-12 text-muted font-sans font-light text-lg">No entries published yet.</p>
        )}
        {posts.map((post) => (
          <motion.article variants={itemVariants} key={post.id} className="py-16 border-b border-border last:border-b-0 group">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-meta uppercase tracking-[0.2em] block mb-2">
                    {post.createdAt ? new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(post.createdAt.toDate()) : 'Just now'}
                  </span>
                  {isAdmin && (
                    <span className={`text-[9px] uppercase tracking-[0.3em] px-2 py-1 border rounded-full inline-block mt-2 ${post.status === 'published' ? 'border-white/30 text-white/70' : 'border-yellow-500/50 text-yellow-500/80'}`}>
                      {post.status}
                    </span>
                  )}
                </div>
                
                {isAdmin && !isEditing && (
                  <button 
                    onClick={() => { setIsEditing(true); setCurrentPost(post); }}
                    className="text-[10px] text-meta uppercase tracking-[0.2em] text-left mt-8 hover:text-white transition-colors w-max border-b border-transparent hover:border-white"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="md:col-span-9">
                <h3 className="text-3xl md:text-5xl font-sans font-light mb-8 tracking-[-0.02em] leading-tight group-hover:text-white transition-colors">{post.title}</h3>
                <div className="prose prose-invert max-w-none text-muted font-sans text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                  {post.content}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-8">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[9px] text-meta uppercase tracking-[0.2em] border border-border px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionHeader>
  );
}
