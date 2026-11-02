import "./App.css";
import Converter from "./components/Converter";

function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <span>
            <img
              src="/icons/exchange_brand_icon.svg"
              alt=""
              width="36"
              height="36"
            />
          </span>
          <span className="brand_name">مبدل ارز</span>
        </div>
      </header>
      <main className="main">
        <div className="intro">
          <h1 className="intro_title">دلار و ریال را در لحظه تبدیل کنید</h1>
          <p className="intro_text">
            نرخ دلار را وارد کنید؛ نتیجه همزمان با تایپ نمایش داده می‌شود.
          </p>
        </div>
        <Converter />
      </main>
    </div>
  );
}

export default App;
