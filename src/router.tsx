import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: () => (
      <div className="p-8 text-center">
        <h1 className="font-display text-2xl">这一页不在</h1>
        <p className="mt-2 text-muted">This page isn’t here. 换一条路，或回首页。</p>
        <a href="/" className="mt-4 inline-block text-forest underline">
          回首页
        </a>
      </div>
    ),
  });
}
