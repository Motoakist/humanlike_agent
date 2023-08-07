const position = {
    boxWidth: 4000,
    // boxHeight: 700,
    boxHeight: 4000,
    // modelScale: 0.45,
    modelScale: 1,
    modelX: 0,
    // modelY: 500,
    modelY: 210,
};

const serverURL = "https://a48e-2400-2651-41c2-1500-4405-5e59-5c98-3b57.jp.ngrok.io";
const debug = false;
const modelPath = "https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@39f3aed18d17f3ff893b842a2c5bef6e19af406e/Resources/Hiyori_free_2/hiyori_free_t08_2.model3.json";

const requiredResources = [
    "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
    "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
    "https://e-sato.net/hiyori_3d_pixi/js/IndexLibrary_pareto.js",

];

const loadScript = (idx) => {
    console.log("Loading ", requiredResources[idx]);
    jQuery.getScript(requiredResources[idx], function () {
        if (idx + 1 < requiredResources.length) {
            loadScript(idx + 1);
        } 
        else {
            initExp();
        }
    });
};

const initExp = () => {
    //インスタンス作成＆DOMLoad操作
    console.log("ロード");
    indexLibrary = new IndexLibrary(debug, serverURL, modelPath, position);
    indexLibrary.onload();
    indexLibrary.set_limit(limit);
    
};

loadScript(0);




