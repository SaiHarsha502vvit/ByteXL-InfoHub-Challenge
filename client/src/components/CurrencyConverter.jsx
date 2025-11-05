import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrency } from "../lib/api";
import "./CurrencyConverter.css";

function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [inputAmount, setInputAmount] = useState("100");
  const [formError, setFormError] = useState("");

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["currency", amount],
    queryFn: () => fetchCurrency(amount),
    enabled: amount > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    placeholderData: (prev) => prev,
  });

  const handleConvert = (e) => {
    e.preventDefault();
    const newAmount = Number.parseFloat(inputAmount);

    if (!Number.isFinite(newAmount) || newAmount <= 0) {
      setFormError("Please enter a valid positive amount.");
      return;
    }

    setFormError("");

    if (Math.abs(newAmount - amount) < 0.01) {
      refetch();
    } else {
      setAmount(newAmount);
    }
  };

  const queryError = error instanceof Error ? error.message : "";
  const isBusy = isLoading || isFetching;

  if (isLoading && !data) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading currency rates...</p>
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
    <div className="currency-converter">
      <header className="module-header">
        <div>
          <h2>Currency Intelligence</h2>
          <p className="module-subtitle">
            Live INR conversions with smart caching and instant refresh
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="refresh-indicator" aria-live="polite">
            Updating rates…
          </span>
        )}
      </header>

      <form onSubmit={handleConvert} className="converter-form">
        <div className="input-group">
          <label htmlFor="amount">Amount in INR</label>
          <div className="input-wrapper">
            <span className="currency-symbol">₹</span>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter amount..."
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="amount-input"
            />
          </div>
        </div>
        {formError && <output className="form-error">{formError}</output>}
        {error && data && <output className="form-error">{queryError}</output>}
        <button type="submit" className="convert-button" disabled={isBusy}>
          {isBusy ? "Converting..." : "Convert"}
        </button>
      </form>

      {data && (
        <div className="conversion-results">
          <div className="source-amount">
            <span className="amount-label">You have:</span>
            <span className="amount-display">₹ {data.amount.toFixed(2)}</span>
          </div>

          <div className="conversion-cards">
            <div className="conversion-card">
              <div className="card-header">
                <span className="flag">🇺🇸</span>
                <h3>US Dollar</h3>
              </div>
              <div className="card-body">
                <div className="converted-amount">
                  <span className="symbol">$</span>
                  <span className="value">
                    {data.conversions.usd.toFixed(2)}
                  </span>
                </div>
                <div className="exchange-rate">
                  1 INR = ${data.rates.usd} USD
                </div>
              </div>
            </div>

            <div className="conversion-card">
              <div className="card-header">
                <span className="flag">🇪🇺</span>
                <h3>Euro</h3>
              </div>
              <div className="card-body">
                <div className="converted-amount">
                  <span className="symbol">€</span>
                  <span className="value">
                    {data.conversions.eur.toFixed(2)}
                  </span>
                </div>
                <div className="exchange-rate">
                  1 INR = €{data.rates.eur} EUR
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
