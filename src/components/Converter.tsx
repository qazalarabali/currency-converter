import { useState } from "react";

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

type Direction = "USDToIRR" | "IRRToUSD";

function Converter() {
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<Direction>("USDToIRR");

  const isUsdToIrr = direction === "USDToIRR";
  const rateNumber = Number(rate);
  const amountNumber = Number(amount);

  const canConvert =
    rate !== "" &&
    amount !== "" &&
    rateNumber > 0 &&
    Number.isFinite(rateNumber) &&
    Number.isFinite(amountNumber);

  let result = 0;

  if (canConvert) {
    result = isUsdToIrr ? amountNumber * rateNumber : amountNumber / rateNumber;
  }

  let resultText = "—";
  let hintText = "";

  if (canConvert && isUsdToIrr) {
    resultText = formatNumber(Math.round(result));
    hintText = `حدود ${formatNumber(Math.round(result / 10))} تومان`;
  }

  if (canConvert && !isUsdToIrr) {
    resultText = formatNumber(result, 2);
    // hintText = `هر ۱ دلار = ${formatNumber(rateNumber)} ریال`;
  }

  function handleSwap() {
    if (canConvert) {
      const newAmount = isUsdToIrr
        ? Math.round(result)
        : Math.round(result * 100) / 100;

      setAmount(String(newAmount));
    }

    setDirection(isUsdToIrr ? "IRRToUSD" : "USDToIRR");
  }

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
            placeholder="نرخ دلار را وارد کنید."
            /* set beshe !!!!*/
            value={rate}
            onChange={(event) => setRate(cleanNumber(event.target.value))}
          />
          <span className="field_unit">ریال</span>
        </div>
      </div>
      <div className="field">
        {/* <label className="field_label" htmlFor="amount">
          مبلغ به دلار
        </label> */}

        <label className="field_label" htmlFor="amount">
          {isUsdToIrr ? "مبلغ به دلار" : "مبلغ به ریال"}
        </label>

        <div className="field_box field_box_amount">
          <input
            id="amount"
            className="field_input field_input_amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="۰"
            /* set beshe !!!!*/
            value={amount}
            onChange={(event) => setAmount(cleanNumber(event.target.value))}
          />

          {/* <span className="currency">
            USD
            <span className="currency_name">دلار</span>
          </span> */}
          <span className="currency">
            {isUsdToIrr ? "USD" : "IRR"}
            <span className="currency_name">
              {isUsdToIrr ? "دلار" : "ریال"}
            </span>
          </span>
        </div>
      </div>
      <div className="swap">
        <button type="button" className="swap_button" onClick={handleSwap}>
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
          <output className="result_value">{resultText}</output>
          {/* <span className="currency currency_light">
            IRR
            <span className="currency_name">ریال</span>
          </span> */}
          <span className="currency currency_light">
            {isUsdToIrr ? "IRR" : "USD"}
            <span className="currency_name">
              {isUsdToIrr ? "ریال" : "دلار"}
            </span>
          </span>
        </div>

        {hintText && <span className="result_hint">{hintText}</span>}
      </div>
      <p className="converter_note">
        نرخ به‌صورت دستی وارد می‌شود و به‌طور خودکار به‌روز نمی‌شود.
      </p>
    </section>
  );
}
export default Converter;
