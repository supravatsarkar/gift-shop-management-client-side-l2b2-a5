import { TRoute, TRoutePath } from "../types";

export const routeGenerator = (items: TRoutePath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.element || item.name) {
      const obj: TRoute = {
        // index: item.index,
        path: item?.path as string,
        element: item.element,
      };
      if (item.children) {
        obj.children = item.children.map((child) => {
          return {
            path: child.path!, // ts null assertion
            element: child.element,
          };
        });
      }
      acc.push(obj);
    }
    // if (item.children) {
    //   item.children.forEach((child) => {
    //     acc.push({
    //       // index: item.index,
    //       path: child.path!, // ts null assertion
    //       element: child.element,
    //     });
    //   });
    // }
    return acc;
  }, []);
  console.log("routes", routes);
  return routes;
};
