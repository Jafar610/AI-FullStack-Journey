
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
              <MessageSquare size={20} strokeWidth={2} />
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
              onClick={scrollToCourseRag}
            >
              Course RAG
            </button>

            <button
              type='button'
              className={styles.landing__navLink}
              onClick={scrollToHowItWorks}
            >
              How it works
            </button>
          </nav>

          <div className={styles.landing__headerActions}>
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
          </div>
        </div>
      </header>

    




    </div>
  )
}

export default Landing