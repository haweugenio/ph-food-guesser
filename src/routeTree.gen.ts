/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RandomImport } from './routes/random'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const RandomRoute = RandomImport.update({
  id: '/random',
  path: '/random',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/random': {
      id: '/random'
      path: '/random'
      fullPath: '/random'
      preLoaderRoute: typeof RandomImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/random': typeof RandomRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/random': typeof RandomRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/random': typeof RandomRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/random'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/random'
  id: '__root__' | '/' | '/random'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  RandomRoute: typeof RandomRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  RandomRoute: RandomRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/random"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/random": {
      "filePath": "random.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
