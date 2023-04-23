const importObject = {
  imports: {
    display: arg => {
      document.querySelector("div").innerHTML = arg;
    }
  }
};

async function init() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("example2.wasm"),
    importObject
  );
  const handler = instance.exports.more;
  document.querySelector("button").onclick = handler;
};

init();
