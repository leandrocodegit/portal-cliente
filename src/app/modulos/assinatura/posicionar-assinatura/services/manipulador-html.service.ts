import { EventEmitter, Injectable } from '@angular/core';
import interact from 'interactjs';

@Injectable({
  providedIn: 'root'
})
export class ManipuladorHtmlService {

  public duplicar = new EventEmitter();

  constructor() { }

  addZone(element: any, pagina: any) {
    const newElement = document.createElement("div");
    newElement.setAttribute('data-page-number', pagina);
    newElement.id = `zone-${pagina}`;
    newElement.className = "inner-dropzone";
    newElement.style.position = 'absolute';
    newElement.style.width = `100%`;
    newElement.style.height = `100%`;
    newElement.style.minHeight = `55px`;
    newElement.style.top = `0`;
    newElement.style.left = `0`;
    newElement.style.borderRadius = `5px`;
    newElement.style.border = `3px dotted rgb(255 200 82)`;

    element.appendChild(newElement);

    // === Criar tooltip ===
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip-mouse";
    tooltip.innerHTML = `
    <div class="flex flex-col justify-between grow">
      <div class="flex flex-col justify-between w-full">
        <div class="flex justify-between">
          <span class="material-symbols-outlined expand-left-top" style="color: #ffcc80ff">arrows_more_down</span>
          <span class="material-symbols-outlined expand-right-top" style="color: #ffcc80ff">arrows_more_down</span>
        </div>
        <div class="grow flex justify-center items-center">
          <div class="flex flex-col justify-between items-center gap-0">
              <img class="box-assign" src="assets/icons/assign.png"/>
           </div>
        </div>
        <div class="flex justify-between">
          <span class="material-symbols-outlined expand-left-bottom" style="color: #ffcc80ff">arrows_more_down</span>
          <span class="material-symbols-outlined expand-right-bottom" style="color: #ffcc80ff">arrows_more_down</span>
        </div>
      </div>
    </div>
  `;
    tooltip.style.position = "absolute";
    tooltip.style.color = "#fff";
    tooltip.style.borderRadius = "5px";
    tooltip.style.pointerEvents = "none"; // não intercepta clique
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.2s";
    tooltip.style.border = `dotted`;
    tooltip.style.borderWidth = `2px`;
    tooltip.style.borderColor = "#ffbf5fe1";
    tooltip.style.background = ``;
    tooltip.style.width = '25%';
    tooltip.style.pointerEvents = "none";
    newElement.appendChild(tooltip);

    // === Eventos ===
    newElement.addEventListener("mousemove", (e: MouseEvent) => {
      // só mostra se o mouse estiver no elemento principal, não em um filho
      if (e.target === newElement) {
        const dropzoneRect = newElement.getBoundingClientRect();
        const leftPercent = ((e.clientX - dropzoneRect.left) / dropzoneRect.width) * 100 - 12;
        const topPercent = ((e.clientY - dropzoneRect.top) / dropzoneRect.height) * 100 - 3.7;

        tooltip.style.left = `${leftPercent}%`;
        tooltip.style.top = `${topPercent}%`;
        tooltip.style.opacity = "1";
      } else {
        tooltip.style.opacity = "0";
      }
    });

    newElement.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });

    newElement.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });

    return newElement;
  }

  addDraggleRender(event: any, signatario: any, id: string, pagina: number, ajustarPosicao: boolean, posicoes: Map<number, Map<any, any>>, left: number, top: number, width: any, height: any) {
    return this.addDraggle(event, signatario, id, pagina, ajustarPosicao, posicoes, left, top, width, height)
  }

  addDraggle(event: any, signatario: any, id: string, pagina: any, ajustarPosicao: boolean, posicoes: Map<number, Map<any, any>>, left?: number, top?: number, width?: any, height?: any) {

    const newDraggable = document.createElement('div');
    newDraggable.setAttribute('data-posicao', id);
    newDraggable.setAttribute('data-mail', signatario.email);
    newDraggable.setAttribute('data-page-number', pagina);
    newDraggable.classList.add('draggable-sign', 'drag-drop');
    newDraggable.style.textAlign = 'center';
    if (width) {
      newDraggable.style.width = `${width}px`;
      newDraggable.style.height = `${height}px`;
    }

    newDraggable.innerHTML =
      `
    <div class="flex flex-col justify-between grow h-full">
        <div class="relative group inline-block">
      <span
        style="color: ${signatario.color}"
        data-posicao="${id}"
        data-mail="${signatario.email}"
        class="remover material-symbols-outlined cursor-pointer">
        cancel
      </span>
      <div
        class="tooltip-assign flex items-center gap-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-8
              p-4 text-white bg-gray-800 rounded-lg shadow-lg
              opacity-0 hidden group-hover:opacity-90 group-hover:flex transition-opacity duration-300 whitespace-nowrap">
        <span
          style="color: rgb(124 164 181);"
          class="material-symbols-outlined">
          cancel
        </span> Remover posição
      </div>
    </div>
    <div class="relative group inline-block">
      <span
        style="color: ${signatario.color}"
        data-posicao="${id}"
        data-mail="${signatario.email}"
        class="remover-todos material-symbols-outlined cursor-pointer">
        contract_delete
      </span>
      <div
        class="tooltip-assign flex items-center gap-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-8
              p-4 text-white bg-gray-800 rounded-lg shadow-lg
              opacity-0 hidden group-hover:opacity-90 group-hover:flex transition-opacity duration-300 whitespace-nowrap">
        <span
          style="color: rgb(124 164 181);"
          class="material-symbols-outlined">
          contract_delete
        </span> Remover de todas as páginas
      </div>
    </div>
        <div class="relative group inline-block">
      <span
        style="color: ${signatario.color}"
        data-posicao="${id}"
        class="copiar material-symbols-outlined cursor-pointer">
        copy_all
      </span>
      <div
        class="tooltip-assign flex items-center gap-2 border absolute bottom-full left-1/2 -translate-x-1/2 mb-8
              p-4 text-white bg-gray-800 rounded-lg shadow-lg
              opacity-0 hidden group-hover:opacity-90 group-hover:flex transition-opacity duration-300 whitespace-nowrap">
        <span
          style="color: rgb(124 164 181);"
          class="material-symbols-outlined">
          copy_all
        </span> Copiar para todas as páginas
      </div>
    </div>
      <div class="flex flex-col justify-between w-full h-full">
        <div class="flex justify-between">
          <span class="material-symbols-outlined expand-left-top" style="color: ${signatario.color}">arrows_more_down</span>
          <span class="material-symbols-outlined expand-right-top" style="color: ${signatario.color}">arrows_more_down</span>
        </div>
        <div class="grow flex justify-center items-center">
          <div class="flex flex-col justify-between items-center">
              <img class="box-assign" src="assets/icons/assign.png"/>
              <span style="font-family: monospace;color: ${signatario.color};font-size: calc(0.5em + 4px);position: absolute;bottom: 4px;">${signatario?.nome || 'Leandro'}</span>
          </div>
        </div>
        <div class="flex justify-between">
          <span class="material-symbols-outlined expand-left-bottom" style="color: ${signatario.color}">arrows_more_down</span>
          <span class="material-symbols-outlined expand-right-bottom" style="color: ${signatario.color}">arrows_more_down</span>
        </div>
      </div>
    </div>
    `;

    let xLeft = left;
    let yTop = top;

    if (!left && !top) {
      if (event.currentTarget.getBoundingClientRect()) {
        const dropzoneRect = event.currentTarget.getBoundingClientRect();
        xLeft = signatario.left;
        yTop = signatario.top;
      } else {
        xLeft = posicoes.get(pagina).get(id).left;
        yTop = posicoes.get(pagina).get(id).top;
      }
    }

    newDraggable.style.position = 'absolute';
    newDraggable.style.left = `${xLeft}%`;
    newDraggable.style.top = `${yTop}%`;
    newDraggable.style.border = `dotted`;
    newDraggable.style.borderWidth = `2px`;
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

    const removerTotosBtn = newDraggable.querySelector('.remover-todos');
    if (removerTotosBtn) {
      removerTotosBtn.addEventListener('click', (e) => {
        const email = removerTotosBtn.getAttribute('data-mail');
        this.removerTodos(email, posicoes);
        e.stopPropagation();
        newDraggable.remove();
      });
    }

    const copiarBtn = newDraggable.querySelector('.copiar');
    if (copiarBtn) {
      copiarBtn.addEventListener('click', (e) => {
        const zone = copiarBtn.getAttribute('data-posicao');
        const email = copiarBtn.getAttribute('data-mail');

        const pagina = newDraggable.getAttribute('data-page-number');
        this.duplicar.emit({
          pagina: pagina,
          zone: zone,
          email: email
        })
        e.stopPropagation();
      });
    }


    if (!left && !top) {
      event.currentTarget.appendChild(newDraggable);
    } else {
      event.appendChild(newDraggable);
    }
    return newDraggable;
  }


  removerTodos(email: string, posicoes: Map<number, Map<any, any>>) {
    Array.from(posicoes.keys()).forEach(page => {
      Array.from(posicoes.get(page).keys()).forEach(key => {
        const posicao = posicoes.get(page).get(key);
        if (posicoes.get(page).get(key).signatario.email == email) {
          if(posicao?.drag)
            posicao?.drag.remove();
          posicoes.get(page).delete(key);
        }
      })
    })
  }


  addPosicao(posicao: any, element: any) {
    const newDraggable = document.createElement('div');
    newDraggable.id = posicao.id;
    newDraggable.classList.add('posicao-print');
    newDraggable.style.textAlign = 'center';
    newDraggable.innerHTML = `
    <span id="label">Assinatura</span>`;
    newDraggable.style.position = 'absolute';
    newDraggable.style.left = `${posicao.lef}%`;
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
            if (pagina != 'null') {
              const draggableRect = event.target.getBoundingClientRect();
              const containerRect = document.getElementById('zone-' + pagina)!.getBoundingClientRect();
              const leftPercent = ((draggableRect.left - containerRect.left) / containerRect.width) * 100;
              const topPercent = ((draggableRect.top - containerRect.top) / containerRect.height) * 100;
              const posicaoId = event.target.getAttribute('data-posicao');
              var posicao = posicoes.get(Number.parseInt(pagina)).get(posicaoId);
              if (posicao) {
                posicao.left = leftPercent;
                posicao.top = topPercent;
              }
             // console.log(pagina, posicaoId, leftPercent, topPercent, posicao, posicoes);

              posicoes.get(Number.parseInt(pagina)).set(posicaoId, posicao);
            }
          }
        }
      })
      .resizable({
        edges: {
          top: '.expand-left-top, .expand-right-top',
          left: '.expand-left-bottom, .expand-left-top',
          bottom: '.expand-left-bottom, .expand-right-bottom',
          right: '.expand-right-bottom, .expand-right-top',
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 80, height: 50 },
            max: { width: 350, height: 200 }
          })
        ],
        listeners: {
          move(event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            let pagina = event.target.getAttribute('data-page-number');

            if (pagina == 'null')
              pagina = event.getAttribute('data-page-number');

            const posicaoId = event.target.getAttribute('data-posicao');
            var posicao = posicoes.get(Number.parseInt(pagina)).get(posicaoId);

            if (posicao) {
              posicao.width = event.rect.width;
              posicao.height = event.rect.height;
            }

            posicoes.get(Number.parseInt(pagina)).set(posicao.id, posicao)
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
