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
