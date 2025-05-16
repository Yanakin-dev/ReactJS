import FloatingCartButton from "./components/FloatingCartButton";
import ProductList from "./components/ProductsList";

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-800">
        <div className="max-w-4 mx-auto pt-14">
          <ProductList />
        </div>
      </div>
      <FloatingCartButton />
    </>
  );
}

export default App;
