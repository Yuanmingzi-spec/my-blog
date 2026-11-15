import { useState, useEffect } from 'react'
import { posts, CSDN_HOME } from './data/posts.js'

function PostCard({ post, onOpen }) {
  return (
    <article className="post-card" onClick={onOpen}>
      <div className="post-cover" style={{ background: post.cover }}>
        <span className="post-tag">{post.tag}</span>
      </div>
      <div className="post-body">
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-dot">·</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-footer">
          <span className="post-author">{post.author}</span>
          <span className="post-read">阅读全文 →</span>
        </div>
      </div>
    </article>
  )
}

function PostDetail({ post, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post.id])

  return (
    <div className="detail">
      <button className="back-btn" onClick={onBack}>← 返回列表</button>
      <div className="detail-header">
        <div className="detail-cover" style={{ background: post.cover }}>
          <span className="post-tag">{post.tag}</span>
        </div>
        <div className="post-meta detail-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-dot">·</span>
          <span>{post.readTime}</span>
          <span className="post-dot">·</span>
          <span>{post.author}</span>
        </div>
        <h1 className="detail-title">{post.title}</h1>
      </div>
      <div className="detail-content">
        {post.blocks.map((block, i) => {
          if (block.type === 'h') return <h3 key={i} className="detail-h">{block.text}</h3>
          if (block.type === 'code') return <pre key={i} className="detail-code"><code>{block.text}</code></pre>
          return <p key={i}>{block.text}</p>
        })}
      </div>
      {post.csdn && (
        <div className="detail-source">
          本文首发于 CSDN ·{' '}
          <a href={post.csdn} target="_blank" rel="noreferrer">查看原文 ↗</a>
        </div>
      )}
      <div className="detail-nav">
        {posts.filter((p) => p.id !== post.id).slice(0, 2).map((p) => (
          <div key={p.id} className="related-item" onClick={() => onBack('related', p)}>
            <span className="related-tag">{p.tag}</span>
            <span className="related-title">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activePost, setActivePost] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [activeTag, setActiveTag] = useState('全部')

  const tags = ['全部', ...new Set(posts.map((p) => p.tag))]

  const filtered = posts.filter((p) => {
    const matchTag = activeTag === '全部' || p.tag === activeTag
    const matchKeyword =
      !keyword ||
      p.title.toLowerCase().includes(keyword.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(keyword.toLowerCase())
    return matchTag && matchKeyword
  })

  const openPost = (post) => setActivePost(post)

  const handleBack = (mode, related) => {
    if (mode === 'related' && related) {
      setActivePost(related)
    } else {
      setActivePost(null)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => { setActivePost(null) }}>
            <span className="logo-mark">沅</span>
            <span className="logo-text">沅明子的博客</span>
          </div>
          <nav className="nav">
            {tags.map((tag) => (
              <button
                key={tag}
                className={'nav-item' + (activeTag === tag ? ' active' : '')}
                onClick={() => { setActiveTag(tag); setActivePost(null) }}
              >
                {tag}
              </button>
            ))}
            <a
              className="nav-item nav-link"
              href={CSDN_HOME}
              target="_blank"
              rel="noreferrer"
            >
              CSDN 主页 ↗
            </a>
          </nav>
        </div>
      </header>

      {activePost ? (
        <main className="main">
          <PostDetail post={activePost} onBack={handleBack} />
        </main>
      ) : (
        <main className="main">
          <section className="hero">
            <h1 className="hero-title">沅明子的博客</h1>
            <p className="hero-sub">
              记录嵌入式开发与 STM32 学习路上的思考，一共 {posts.length} 篇文章。
            </p>
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="搜索文章标题或摘要…"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </section>

          <section className="post-list">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} onOpen={() => openPost(post)} />
            ))}
            {filtered.length === 0 && (
              <div className="empty">没有找到匹配的文章，换个关键词试试？</div>
            )}
          </section>
        </main>
      )}

      <footer className="footer">
        <p>© 2026 沅明子的博客 · 用 React 构建 · <a href={CSDN_HOME} target="_blank" rel="noreferrer">CSDN</a></p>
      </footer>
    </div>
  )
}
