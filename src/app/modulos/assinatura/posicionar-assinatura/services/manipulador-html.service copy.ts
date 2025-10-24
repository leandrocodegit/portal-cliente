import { EventEmitter, Injectable } from '@angular/core';
import interact from 'interactjs';

@Injectable({
  providedIn: 'root'
})
export class ManipuladorHtmlServiceCopy {

  public duplicar = new EventEmitter();

  constructor() { }


  addZone(element: any, pagina: any) {

    const newElement = document.createElement("div");
    newElement.setAttribute('data-page-number', pagina);
    newElement.id = `zone-${pagina}`;

    newElement.className = "inner-dropzone";

    newElement.innerHTML = `
        <p class="esconder">Clique no local que deseja assinar</p>
      `;

    newElement.style.position = 'absolute';
    newElement.style.width = `100%`;
    newElement.style.height = `100%`;
    newElement.style.minHeight = `60px`;
    newElement.style.top = `0`;
    newElement.style.left = `0`;
    newElement.style.border = `5px dashed rgb(255 200 82)`;
    element.appendChild(newElement);

    return newElement;
  }

  addDraggleRender(event: any, signatario: any, id: string, pagina: any, ajustarPosicao: boolean, posicoes: Map<number, Map<any, any>>,  copia: boolean, left: number, top: number) {
    return this.addDraggle(event, signatario, id, pagina, ajustarPosicao, posicoes, copia, left, top)
  }

  addDraggle(event: any, signatario: any, id: string, pagina: any, ajustarPosicao: boolean, posicoes: Map<number, Map<any, any>>, copia: boolean, left?: number, top?: number) {

    const newDraggable = document.createElement('div');
    newDraggable.setAttribute('data-posicao', id);
    newDraggable.setAttribute('data-signatario', 'lpoliveira.ti@gmail.com');
    newDraggable.setAttribute('data-page-number', pagina);
    //newDraggable.id = id,
    newDraggable.classList.add('draggable-sign', 'drag-drop');
    newDraggable.style.textAlign = 'center';

    newDraggable.innerHTML =
      `
    <div class="flex flex-col justify-between grow h-full">
    <span data-posicao="${id}" class="remover material-symbols-outlined">cancel</span>
    <div class="relative group">
     ${copia ? ('') : (`<span data-posicao="${id}" class="copiar material-symbols-outlined">copy_all</span>`)}
        <span
          class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Copiar para todas as paginas
        </span>
    </div>
      <div class="flex flex-col justify-between w-full h-full">
        <div class="flex justify-between">
          <span class="material-symbols-outlined expand-left-top">arrows_more_down</span>
          <span class="material-symbols-outlined expand-right-top">arrows_more_down</span>
        </div>
        <div class="grow flex justify-center items-center">
          <div class="flex flex-col justify-between items-center gap-2">
              <span id="label">Assinatura</span>
              <span>${signatario?.nome || 'Leandro'}</span>
          </div>
        </div>
        <div class="flex justify-between">
          <span class="material-symbols-outlined expand-left-bottom">arrows_more_down</span>
          <span class="material-symbols-outlined expand-right-bottom">arrows_more_down</span>
        </div>
      </div>
    </div>
    `;

    let xLeft = left;
    let yTop = top;

    console.log('Drag 1', xLeft, yTop);

    if (!left && !top) {
      if (event.currentTarget.getBoundingClientRect()) {
        const dropzoneRect = event.currentTarget.getBoundingClientRect();
        xLeft = event.clientX - dropzoneRect.left;
        yTop = event.clientY - dropzoneRect.top;
        console.log('Drag 2', xLeft, yTop);
      } else {
        xLeft = posicoes.get(pagina).get(id).left;
        yTop = posicoes.get(pagina).get(id).top;
      }
    }

    if (ajustarPosicao) {
      if (xLeft > 110)
        xLeft = xLeft - 110;

      if (yTop > 35)
        yTop = yTop - 35;
    }

    newDraggable.style.position = 'absolute';
    newDraggable.style.left = `${xLeft}px`;
    newDraggable.style.top = `${yTop}px`;
    newDraggable.style.border = `dashed`;
    newDraggable.style.borderWidth = `3px`;
    newDraggable.style.borderColor = `${signatario.color}`;
    newDraggable.style.background = `${signatario.color}35`;

    const removerBtn = newDraggable.querySelector('.remover');
    if (removerBtn) {
      removerBtn.addEventListener('click', (e) => {
        const zone = removerBtn.getAttribute('data-posicao');
        posicoes.get(Number.parseInt(pagina)).delete(zone);
        e.stopPropagation(); // evita conflito com drag
        newDraggable.remove();
      });
    }

    const copiarBtn = newDraggable.querySelector('.copiar');
    if (copiarBtn) {
      copiarBtn.addEventListener('click', (e) => {
        const zone = copiarBtn.getAttribute('data-posicao');
        const pagina = newDraggable.getAttribute('data-page-number');
        this.duplicar.emit({
          pagina: pagina,
          zone: zone
        })
        e.stopPropagation();
      });
    }


    if (!left && !top) {
      event.currentTarget.appendChild(newDraggable);
    } else {
      event.appendChild(newDraggable);
    }

    console.log('Drag 3', xLeft, yTop);


    return newDraggable;
  }



  addPosicao(posicao: any, element: any) {

    const newDraggable = document.createElement('div');
    newDraggable.id = posicao.id,
      newDraggable.classList.add('posicao-print');
    newDraggable.style.textAlign = 'center';

    newDraggable.innerHTML = `
    <span id="label">Assinatura</span>`;


    newDraggable.style.position = 'absolute';
    newDraggable.style.left = `${posicao.left}%`;
    newDraggable.style.top = `${posicao.top}%`;

    element.appendChild(newDraggable);


    return newDraggable;
  }

  novaPosicao(newDraggable: any, posicoes: Map<number, Map<any, any>>) {
    interact(newDraggable)
      .draggable({
        autoScroll: false,
        inertia: false,
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 0, y: 0 })
            ],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
          }),
          interact.modifiers.restrict({
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: false
          })
        ],
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          end(event) {
            let pagina = event.target.getAttribute('data-page-number');



            if (pagina == 'null')
              pagina = event.getAttribute('data-page-number');
            console.log('Reference', event.target);
            if (pagina != 'null') {
              const draggableRect = event.target.getBoundingClientRect();
              const containerRect = document.getElementById('zone-' + pagina)!.getBoundingClientRect();

              console.log('Style', draggableRect.left, draggableRect.top);


              const leftPercent = ((draggableRect.left - containerRect.left) / containerRect.width) * 100;
              const topPercent = ((draggableRect.top - containerRect.top) / containerRect.height) * 100;

              const posicaoId = event.target.getAttribute('data-posicao');
              var posicao = posicoes.get(Number.parseInt(pagina)).get(posicaoId);
              console.log('Posicao 1 ', posicao);

              if (posicao) {
                posicao.left = leftPercent;
                posicao.top = topPercent;
              }

              posicoes.get(Number.parseInt(pagina)).set(posicao.id, posicao)
              console.log('Posicao 2 ', posicoes.get(Number.parseInt(pagina)).get(posicao.id));
            }
          }
        }
      })
      .resizable({
        // Aqui você precisa dizer quais lados podem redimensionar
        edges: {
          top: '.inner-dropzone',
          left: '.inner-dropzone',
          bottom: '.inner-dropzone',
          right: '.inner-dropzone',
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 80, height: 70 },
            max: { width: 200, height: 150 }
          })
        ],
        listeners: {
          move(event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            // aplica nova largura e altura
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // move junto se arrastar pela borda esquerda/superior
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        }
      });
  }

}
