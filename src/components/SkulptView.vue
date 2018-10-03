<template>
  <div class="sk-view">
    <form>
      <textarea id="yourCode" v-model="codes" placeholder="input your py code here" cols="80" rows="10">
      </textarea><br/>
      <button class='btn' type="button" @click="runIt">Run</button>
    </form>
    <div id="myCanvas"></div>
  </div>
</template>

<script>
require('../js/skulpt.min')
require('../js/skulpt-stdlib')
const Sk = window.Sk

export default {
  name: 'SkulptView',
  data () {
    return {
      codes: 'import turtle\n' +
        'turtle.color(\'red\')\n' +
        'turtle.forward(75)'
    }
  },
  methods: {
    runIt () {
      Sk.configure({
        output: (text) => {
          this.error = text
        },
        read: (x) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
            throw new Error('File not found: \'' + x + '\'')
          }
          return Sk.builtinFiles['files'][x]
        },
        python3: true
      })

      if (!Sk.TurtleGraphics) {
        Sk.TurtleGraphics = {}
      }

      Sk.TurtleGraphics.height = 600
      Sk.TurtleGraphics.width = 600
      Sk.TurtleGraphics.animate = this.animate
      Sk.canvas = 'myCanvas'
      Sk.TurtleGraphics.target = document.getElementById('myCanvas')

      setTimeout(() => {
        Sk.misceval.asyncToPromise(() => {
          return Sk.importMainWithBody('<stdin>', false, this.codes, true)
        }).then(() => {
          this.loaded = true
        }, () => {
          this.loaded = true
        })
      }, 100)
    }
  }
}
</script>
