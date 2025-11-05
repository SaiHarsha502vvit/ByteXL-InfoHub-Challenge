import { useQuery } from "@tanstack/react-query";
import { fetchQuote } from "../lib/api";
import "./QuoteGenerator.css";

function QuoteGenerator() {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["quote"],
    queryFn: fetchQuote,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
  });

  const queryError = error instanceof Error ? error.message : "";
  const isBusy = isLoading || isFetching;

  if (isLoading && !data) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading inspirational quote...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="error">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{queryError}</p>
        <button onClick={() => refetch()} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="quote-generator">
      <header className="module-header">
        <div>
          <h2>Motivation Stream</h2>
          <p className="module-subtitle">
            Thoughtfully curated wisdom with zero duplicate requests
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="refresh-indicator" aria-live="polite">
            Fetching inspiration…
          </span>
        )}
      </header>

      {error && data && <output className="inline-error">{queryError}</output>}

      {data && (
        <div className="quote-container">
          <div className="quote-icon">💡</div>

          <div className="quote-content">
            <blockquote className="quote-text">"{data.quote}"</blockquote>

            <div className="quote-author">
              <span className="author-label">—</span>
              <span className="author-name">{data.author}</span>
            </div>
          </div>

          <button
            onClick={() => refetch()}
            className="new-quote-button"
            disabled={isBusy}
          >
            {isBusy ? "Refreshing..." : "Get New Quote"}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuoteGenerator;
