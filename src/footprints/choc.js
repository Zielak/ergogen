// Kailh Choc PG1350
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh choc hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//    diodes: default is false
//      if true, will add diode pads and paths
//      (snatched from https://github.com/crides/choc/tree/master/pg1350.pretty)
// 
// note: hotswap and reverse can be used simultaneously

module.exports = {
  nets: {
    from: undefined,
    to: undefined
  },
  params: {
    class: 'S',
    hotswap: false,
    reverse: false,
    keycaps: false,
    diodes: false,
  },
  body: p => {
    const standard = `
      (module PG1350 (layer F.Cu) (tedit 5DD50112)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* corner marks */}
      (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))      
      
      ${''/* middle shaft */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))
        
      ${''/* stabilizers */}
      (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))

      ${''/* led/diode */}
      (fp_line (start -2.5 6.3) (end 2.5 6.3) (layer "Dwgs.User") (width 0.15))
      (fp_line (start 2.5 3.2) (end -2.5 3.2) (layer "Dwgs.User") (width 0.15))
      (fp_line (start 2.5 6.3) (end 2.5 3.2) (layer "Dwgs.User") (width 0.15))
      (fp_line (start -2.5 3.2) (end -2.5 6.3) (layer "Dwgs.User") (width 0.15))
      `

    function silks() {
      let silkRef = `
        (fp_text reference "" (at 0 0) (layer "F.SilkS")
          (effects (font (size 1.27 1.27) (thickness 0.15)))
        )
        (fp_text value "" (at 0 0) (layer "F.SilkS")
          (effects (font (size 1.27 1.27) (thickness 0.15)))
        )
      `
      if (p.param.reverse) {
        silkRef += `
          (fp_text user "\${REFERENCE}" (at 11.445 -5.095) (layer "B.SilkS")
            (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
          )
        `
      }

      let silkHotSwap = `
        (fp_line (start 2.504 -1.488) (end 7.004 -1.488) (layer "B.SilkS") (width 0.15))
        (fp_line (start -1.996 -7.688) (end -1.496 -8.188) (layer "B.SilkS") (width 0.15))
        (fp_line (start 2.504 -2.188) (end 2.504 -1.488) (layer "B.SilkS") (width 0.15))
        (fp_line (start 7.004 -1.488) (end 7.004 -1.988) (layer "B.SilkS") (width 0.15))
        (fp_line (start -1.496 -3.688) (end 1.004 -3.688) (layer "B.SilkS") (width 0.15))
        (fp_line (start -1.996 -4.188) (end -1.496 -3.688) (layer "B.SilkS") (width 0.15))
        (fp_line (start 7.004 -5.588) (end 7.004 -6.188) (layer "B.SilkS") (width 0.15))
        (fp_line (start -1.496 -8.188) (end 1.504 -8.188) (layer "B.SilkS") (width 0.15))
        (fp_line (start 2.004 -6.688) (end 2.004 -7.688) (layer "B.SilkS") (width 0.15))
        (fp_line (start 7.004 -6.188) (end 2.504 -6.188) (layer "B.SilkS") (width 0.15))
        (fp_line (start 1.504 -8.188) (end 2.004 -7.688) (layer "B.SilkS") (width 0.15))
        (fp_arc (start 1.004 -3.688) (mid 2.06466 -3.24866) (end 2.504 -2.188) (layer "B.SilkS") (width 0.15))
        (fp_arc (start 2.504 -6.188) (mid 2.150447 -6.334447) (end 2.004 -6.688) (layer "B.SilkS") (width 0.15))
      `

      if (p.param.reverse) {
        silkHotSwap += `
        (fp_line (start -6.996 -1.488) (end -6.996 -1.988) (layer "F.SilkS") (width 0.15))
        (fp_line (start -6.996 -6.188) (end -2.496 -6.188) (layer "F.SilkS") (width 0.15))
        (fp_line (start -6.996 -5.588) (end -6.996 -6.188) (layer "F.SilkS") (width 0.15))
        (fp_line (start -2.496 -1.488) (end -6.996 -1.488) (layer "F.SilkS") (width 0.15))
        (fp_line (start -1.496 -8.188) (end -1.996 -7.688) (layer "F.SilkS") (width 0.15))
        (fp_line (start -1.996 -6.688) (end -1.996 -7.688) (layer "F.SilkS") (width 0.15))
        (fp_line (start 1.504 -3.688) (end -0.996 -3.688) (layer "F.SilkS") (width 0.15))
        (fp_line (start -2.496 -2.188) (end -2.496 -1.488) (layer "F.SilkS") (width 0.15))
        (fp_line (start 2.004 -7.688) (end 1.504 -8.188) (layer "F.SilkS") (width 0.15))
        (fp_line (start 1.504 -8.188) (end -1.496 -8.188) (layer "F.SilkS") (width 0.15))
        (fp_line (start 2.004 -4.188) (end 1.504 -3.688) (layer "F.SilkS") (width 0.15))
        (fp_arc (start -2.496 -2.188) (mid -2.05666 -3.24866) (end -0.996 -3.688) (layer "F.SilkS") (width 0.15))
        (fp_arc (start -1.996 -6.688) (mid -2.142447 -6.334447) (end -2.496 -6.188) (layer "F.SilkS") (width 0.15))
        `
      }

      return silkRef + (p.param.hotswap ? silkHotSwap : '')
    }

    const keycap = `
      ${'' /* keycap marks */}
      (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.15))
      `

    function diode() {
      const diodePad = p.param.reverse ? "thru_hole" : "smd"

      const out = `
        (attr smd)
        ${'' /* diode mark */}
        (fp_line (start -2.25 5.58) (end -2.25 3.55) (layer B.SilkS) (width 0.12))
        (fp_line (start -2.25 3.55) (end 1.65 3.55) (layer B.SilkS) (width 0.12))
        (fp_line (start -2.25 5.58) (end 1.65 5.58) (layer B.SilkS) (width 0.12))
  
        ${'' /* smd pads */}
        (pad "2D" ${diodePad} rect (at 1.65 4.55 ${p.rot}) (size 0.9 1.2) (drill 0.4) (layers *.Cu *.Mask) ${p.local_net('D').str})
        (pad "3" ${diodePad} rect (at -1.65 4.55 ${p.rot}) (size 0.9 1.2) (drill 0.4) (layers *.Cu *.Mask) ${p.net.to.str})
        `
      return out
    }

    function paths() {
      const { reverse, hotswap, diodes } = p.param
      let front = ''
      let back = ''

      const via = `
        (pad "1" thru_hole circle (at 0 -2.675) (size 0.3 0.3) (drill 0.1) (layers *.Cu *.Mask) ${p.net.from.str})
      `

      if (reverse && hotswap && diodes) {
        // 2 to diode
        front += `
          (fp_line (start -8.275 -3.75) (end -6.049 -1.524) (layer "F.Cu") (width 0.2))
          (fp_line (start 0.762 4.55) (end -5.334 -1.524) (layer "F.Cu") (width 0.2))
          (fp_line (start 1.65 4.55) (end 0.762 4.55) (layer "F.Cu") (width 0.2))
          (fp_line (start -6.049 -1.524) (end -5.334 -1.524) (layer "F.Cu") (width 0.2))
        `
        back += `
          (fp_line (start 8.275 0) (end 3.703 4.572) (layer "B.Cu") (width 0.2))
          (fp_line (start 8.275 -3.75) (end 8.275 0) (layer "B.Cu") (width 0.2))
          (fp_line (start 3.703 4.572) (end 1.65 4.572) (layer "B.Cu") (width 0.2))
        `
      }
      if (reverse && hotswap) {
        // 1 to uvia
        front += `(fp_line (start 3.275 -5.95) (end 0 -2.675) (layer "F.Cu") (width 0.2))`
        back += `(fp_line (start -3.275 -5.95) (end 0 -2.675) (layer "B.Cu") (width 0.2))`
      }

      return `
        ${front}
        ${back}
        ${reverse && hotswap ? via : ''}
      `
    }

    function pins(def_neg, def_pos, def_side) {
      if (p.param.hotswap) {
        const exit = p.param.diodes ? p.local_net('D').str : p.net.to.str
        return `
          ${'' /* holes */}
          (pad "" np_thru_hole circle (at ${def_pos}5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
          (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))
      
          ${'' /* net pads */}
          (pad 1 smd rect (at ${def_neg}3.275 -5.95 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.net.from.str})
          (pad 2 smd rect (at ${def_pos}8.275 -3.75 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${exit})
        `
      } else {
        return `
            ${''/* pins */}
            (pad 1 thru_hole circle (at ${def_pos}5 -3.8) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.net.from.str})
            (pad 2 thru_hole circle (at ${def_pos}0 -5.9) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${exit})
          `
      }
    }

    if (p.param.reverse) {
      return `
        ${standard}
        ${silks()}
        ${p.param.diodes ? diode() : ''}
        ${paths()}
        ${p.param.keycaps ? keycap : ''}
        ${pins('-', '', 'B')}
        ${pins('', '-', 'F')})
        `
    } else {
      return `
        ${standard}
        ${silks()}
        ${p.param.diodes ? diode() : ''}
        ${paths()}
        ${p.param.keycaps ? keycap : ''}
        ${pins('-', '', 'B')})
        `
    }
  }
}
