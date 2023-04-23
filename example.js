const importObject = {
  imports: {
    display: arg => {
      document.querySelector("div").innerHTML = arg;
    }
  }
};

const code = `
(module
  (import "imports" "display" (func $display (param i32)))
  (export "more" (func $more))
  (global $counter (mut i32) (i32.const 0))

  (func $inc (param i32) (result i32)
    local.get 0
    i32.const 1
    i32.add)

  (func $more
    global.get $counter
    call $inc
    global.set $counter
    global.get $counter
    call $display
  )
)
`;

async function init() {
  const wabt = await WabtModule();
  const module = wabt.parseWat("example.wat", code);
  module.resolveNames();
  module.validate();
  const binary = module.toBinary({});
  const wasm = new WebAssembly.Module(binary.buffer);
  const instance = new WebAssembly.Instance(wasm, importObject);
  const handler = instance.exports.more;
  document.querySelector("button").onclick = handler;
};

init();
