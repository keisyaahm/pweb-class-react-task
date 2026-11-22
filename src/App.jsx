import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductModal from "./components/organisms/ProductModal";
import { STORAGE_KEY_SETTINGS } from "./data/initialProducts";
import { productApi } from "./services/productApi";

export default function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [displayMode, setDisplayMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved === "list" || saved === "grid") {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return "grid";
  });

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setApiError("");
    try {
      setProducts(await productApi.getAll());
    } catch (error) {
      setApiError(error.message || "Tidak dapat mengambil data produk dari server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, displayMode);
    } catch (e) {
      console.error(e);
    }
  }, [displayMode]);

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  async function handleSaveProduct(productData) {
    setApiError("");
    try {
      if (productData.id) {
        const updated = await productApi.update(productData.id, productData);
        setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        return updated;
      }

      const created = await productApi.create(productData);
      setProducts((prev) => [created, ...prev]);
      return created;
    } catch (error) {
      setApiError(error.message || "Produk gagal disimpan ke Express API.");
      throw error;
    }
  }

  async function handleDeleteProduct(productId) {
    setApiError("");
    try {
      await productApi.remove(productId);
      setProducts((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      setApiError(error.message || "Produk gagal dihapus dari Express API.");
      throw error;
    }
  }

  async function handleResetData() {
    setApiError("");
    try {
      const seededProducts = await productApi.reset();
      setProducts(seededProducts);
    } catch (error) {
      setApiError(error.message || "Data gagal direset melalui Express API.");
      throw error;
    }
  }

  function handleChangeDisplayMode(mode) {
    setDisplayMode(mode);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              totalProducts={products.length}
              isLoading={isLoading}
              apiError={apiError}
              onRetry={loadProducts}
            />
          }
        >
          <Route
            index
            element={
              <DashboardPage
                products={products}
                onOpenCreate={() => setIsQuickAddOpen(true)}
              />
            }
          />

          <Route
            path="products"
            element={
              <ProductsPage
                products={products}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
                displayMode={displayMode}
                onChangeDisplayMode={handleChangeDisplayMode}
              />
            }
          />

          <Route
            path="products/:id"
            element={
              <ProductDetailPage
                products={products}
                isLoading={isLoading}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />

          <Route
            path="settings"
            element={
              <SettingsPage
                displayMode={displayMode}
                onChangeDisplayMode={handleChangeDisplayMode}
                products={products}
                onResetData={handleResetData}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ProductModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSave={async (data) => {
          await handleSaveProduct(data);
          navigate("/products");
        }}
      />
    </>
  );
}
