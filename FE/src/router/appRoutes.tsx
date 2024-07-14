import NotFoundPage from "@/page/404";
import { Home } from "@/page/Home";
import { RouteType } from "./config";
import ProductHome from "@/page/Home/ProductHome";
import ProductDetail from "@/page/Home/ProductDetail";
import About from "@/page/About";
import Services from "@/page/Services";
import AboutDetail from "@/page/About/AboutDetail";
import Case from "@/page/Case";
import { Product } from "@/page/Product";
import ProductProduct from "@/page/Product/ProductProduct";
import ProductProductDeltail from "@/page/Product/ProductProductDeltail";
import ProductCase from "@/page/Case/ProductCase";
import ProductCaseDetail from "@/page/Case/ProductCaseDetail";
import ServicesDetail from "@/page/Services/ServicesDetail";
import Find from "@/page/Find";
import Cart from "@/page/Cart";

const appRoutes: RouteType[] = [
  {
    element: <Home />,
    path: "",
    label: ['Trang đầu','Home'],
    state: 'home',
    child: [
      {
        path: ":id",
        element: <ProductHome />,
        child: [
          {
            path: ":productID",
            element: <ProductDetail />
          }
        ]
      }
    ]
  },
  {
    // index: true,
    element: <About />,
    path: "about",
    label: ['Công ty','About'],
    state: 'about',
    child: [
      {
        path: ":aboutId",
        element: <AboutDetail />,
      }
    ]
  },
  {
    element: <Product />,
    path: "products",
    label: ['Sản phẩm','Products'],
    state: 'products',
    child: [
      {
        path: ":productsid",
        element: <ProductProduct />,
        child: [
          {
            path: ":productsID",
            element: <ProductProductDeltail />
          }
        ]
      }
    ]
  },
  {
    element: <Case />,
    path: "case",
    label: ['Trường hợp','Case'],
    state: 'case',
    child: [
      {
        path: ":caseid",
        element: <ProductCase />,
        child: [
          {
            path: ":caseID",
            element: <ProductCaseDetail />
          }
        ]
      }
    ]
  },
  {
    element: <Services />,
    path: "services",
    label: ['Các dịch vụ kĩ thuật','Services'],
    state: 'services',
    child: [
      {
        path: ":servicesId",
        element: <ServicesDetail />,
      }
    ]
  },
  {
    element: <Find />,
    path: "find",
  },
  {
    element: <Cart />,
    path: "cart",
  }
];

export default appRoutes;