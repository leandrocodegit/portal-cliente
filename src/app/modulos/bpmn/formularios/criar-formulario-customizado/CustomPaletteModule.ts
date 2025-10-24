// custom-palette.module.js
export default {
  __init__: [ 'customPalette' ],
  customPalette: [ 'type', CustomPalette ]
};

function CustomPalette(formEditorPalette) {
  formEditorPalette.registerProvider({
    getPaletteEntries() {
      return {
        'custom-text': {
          group: 'basic',
          icon: '💬', // ícone personalizado
          title: 'Texto Customizado',
          action: {
            dragstart: (event) => {
              event.preventDefault();

              formEditorPalette._emit('element.create', {
                type: 'textfield',
                component: {
                  key: 'customText',
                  label: 'Texto Customizado',
                  type: 'textfield'
                }
              });
            },
            click: (event) => {
              formEditorPalette._emit('element.create', {
                type: 'textfield',
                component: {
                  key: 'customText',
                  label: 'Texto Customizado',
                  type: 'textfield'
                }
              });
            }
          }
        }
      };
    }
  });
}

CustomPalette.$inject = [ 'formEditorPalette' ];
