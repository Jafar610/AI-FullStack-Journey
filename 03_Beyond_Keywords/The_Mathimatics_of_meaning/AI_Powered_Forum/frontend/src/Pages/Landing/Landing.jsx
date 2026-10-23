import styles from './Landing.module.css';
function Landing() {
  return (
    <div className={styles.landing}>
        <header className={styles.landing__header}>
        <div className={styles.landing__headerInner}>
          <button
            type='button'
            className={styles.landing__brand}
            onClick={() => navigate('/')}
            aria-label='Evangadi Forum home'
          >
            <span className={styles.landing__brandMark} aria-hidden>
              {/* <MessageSquare size={20} strokeWidth={2} /> */}
            </span>
            <span className={styles.landing__brandText}>
              <span className={styles.landing__brandName}>Evangadi Forum</span>
              <span className={styles.landing__brandLine}>
                Learn together. Ask with context.
              </span>
            </span>
          </button>

          <nav className={styles.landing__nav} aria-label='Marketing'>
            <button
              type='button'
              className={styles.landing__navLink}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Overview
            </button>
            <button
              type='button'
              className={styles.landing__navLink}
            //   onClick={scrollToCourseRag}
            >
              Course RAG
            </button>

            <button
              type='button'
              className={styles.landing__navLink}
            //   onClick={scrollToHowItWorks}
            >
              How it works
            </button>
          </nav>

          {/* <div className={styles.landing__headerActions}>
            {isAuthenticated ? (
              <button
                type='button'
                className={styles.landing__btnPrimary}
                onClick={() => navigate('/dashboard')}
              >
                Open forum
                <ArrowRight size={16} aria-hidden />
              </button>
            ) : (
              <>
                <button
                  type='button'
                  className={styles.landing__btnGhost}
                  onClick={() => navigate('/auth')}
                >
                  Sign in
                </button>
                <button
                  type='button'
                  className={styles.landing__btnPrimary}
                  onClick={() => navigate('/auth')}
                >
                  Create account
                </button>
              </>
            )}
          </div> */}
        </div>
      </header>

    {/* Main Section startpoint */}
    



    {/* Main Section endpoint */}

     {/* Footer */}
      <footer className={styles.landing__footer}>
             <div className={styles.landing__footerInner}>
               <div>
                 <p className={styles.landing__footerBrand}>Evangadi Forum</p>
                 <p className={styles.landing__footerMeta}>
                   © {new Date().getFullYear()} · Learner-led Q&A
                 </p>
               </div>
               <div className={styles.landing__footerLinks}>
                 <button
                   type='button'
                   className={styles.landing__footerLink}
                   onClick={() => navigate('/auth')}
                 >
                   Sign in
                 </button>
                 <span className={styles.landing__footerDot} aria-hidden>
                   ·
                 </span>
                 <a href='#' className={styles.landing__footerLinkAnchor}>
                   Privacy
                 </a>
                 <span className={styles.landing__footerDot} aria-hidden>
                   ·
                 </span>
                 <a href='#' className={styles.landing__footerLinkAnchor}>
                   Terms
                 </a>
               </div>
             </div>
           </footer>

    </div>
  )
}

export default Landing