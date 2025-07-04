(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/desktop/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>OxidePlatform)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$game$2d$library$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/game-library.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$downloads$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/downloads.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$profile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/profile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$developer$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/developer-dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$friends$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/friends.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$cloud$2d$saves$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/cloud-saves.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$game$2d$detail$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/desktop/components/game-detail-page.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function OxidePlatform() {
    _s();
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("store") // Default to store view
    ;
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedGame, setSelectedGame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const renderActiveView = ()=>{
        if (selectedGame) {
            // The game prop is no longer needed as the component fetches its own data
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$game$2d$detail$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameDetailPage"], {
                onBack: ()=>setSelectedGame(null)
            }, void 0, false, {
                fileName: "[project]/apps/desktop/app/page.tsx",
                lineNumber: 22,
                columnNumber: 14
            }, this);
        }
        switch(activeView){
            case "library":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$game$2d$library$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameLibrary"], {
                    searchQuery: searchQuery
                }, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 26,
                    columnNumber: 16
                }, this);
            case "store":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"], {
                    searchQuery: searchQuery,
                    onGameSelect: setSelectedGame
                }, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 28,
                    columnNumber: 16
                }, this);
            case "friends":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$friends$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Friends"], {
                    isFullView: true
                }, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 30,
                    columnNumber: 16
                }, this);
            case "cloud":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$cloud$2d$saves$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloudSaves"], {}, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 32,
                    columnNumber: 16
                }, this);
            case "downloads":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$downloads$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Downloads"], {}, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 34,
                    columnNumber: 16
                }, this);
            case "profile":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$profile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Profile"], {}, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 36,
                    columnNumber: 16
                }, this);
            case "developer":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$developer$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeveloperDashboard"], {}, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 38,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"], {
                    searchQuery: searchQuery,
                    onGameSelect: setSelectedGame
                }, void 0, false, {
                    fileName: "[project]/apps/desktop/app/page.tsx",
                    lineNumber: 40,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen bg-black text-white flex flex-col overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$desktop$2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                activeView: activeView,
                setActiveView: setActiveView,
                searchQuery: searchQuery,
                setSearchQuery: setSearchQuery
            }, void 0, false, {
                fileName: "[project]/apps/desktop/app/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-hidden",
                children: renderActiveView()
            }, void 0, false, {
                fileName: "[project]/apps/desktop/app/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/desktop/app/page.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(OxidePlatform, "J3u0Ab9DdwV0QVQWlJs/HDR2SaM=");
_c = OxidePlatform;
var _c;
__turbopack_context__.k.register(_c, "OxidePlatform");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=apps_desktop_app_page_tsx_7ac508a6._.js.map