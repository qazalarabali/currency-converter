function convertToEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function cleanNumber(value: string): string {
  const normalized = convertToEnglishDigits(value)
    .replace(/٫/g, ".")
    .replace(/[^0-9.]/g, "");

  return normalized;
}

function formatNumber(value: number, maxDecimals = 0): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: maxDecimals,
  }).format(value);
}

function Converter() {
  return (
    <section className="converter">
      <div className="field">
        <label className="field_label" htmlFor="rate">
          نرخ واحد دلار
        </label>
        <div className="field_box field_box_rate">
          <input
            id="rate"
            className="field_input field_input_rate"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="۲٬۵۸۰٬۰۰۰"
          />
          <span className="field_unit">ریال</span>
        </div>
      </div>
      <div className="field">
        <label className="field_label" htmlFor="amount">
          مبلغ به دلار
        </label>

        <div className="field_box field_box_amount">
          <input
            id="amount"
            className="field_input field_input_amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="۰"
          />

          <span className="currency">
            USD
            <span className="currency_name">دلار</span>
          </span>
        </div>
      </div>
      <div className="swap">
        <button type="button" className="swap_button">
          <img
            src="/icons/swap_currency_icon.svg"
            alt=""
            width="45"
            height="45"
          />
        </button>
      </div>
      <div className="field">
        <span className="field_label">معادل</span>

        <div className="result">
          <output className="result_value">—</output>

          <span className="currency currency_light">
            IRR
            <span className="currency_name">ریال</span>
          </span>
        </div>

        <span className="result_hint">نرخ و مبلغ را وارد کنید</span>
      </div>
      <p className="converter_note">
        نرخ به‌صورت دستی وارد می‌شود و به‌طور خودکار به‌روز نمی‌شود.
      </p>
    </section>
  );
}
export default Converter;
