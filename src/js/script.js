(function() {
  let div = document.getElementById('content');
  var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  var days = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"];
  
  function estructurar() {
    for (m = 0; m <= 11; m++) {
      //Mes
      let mes = document.createElement("div");
      mes.className = "mes";
      div.appendChild(mes);

      //Tabla
      let table = document.createElement("table");
      table.className = "table";
      mes.appendChild(table);

      //Título
      let titulo = document.createElement("caption");
      titulo.className = "titulo";
      titulo.innerText = months[m];
      table.appendChild(titulo);

      //Cabecera
      let cabecera = document.createElement("thead");
      table.appendChild(cabecera);
      let fila = document.createElement("tr");
      cabecera.appendChild(fila);
      for (d = 0; d < 7; d++) {
        let dia = document.createElement("th");
        dia.innerText = days[d];
        fila.appendChild(dia);
      }
      
      //Cuerpo
      let cuerpo = document.createElement("tbody");
      table.appendChild(cuerpo);
      for (f = 0; f < 6; f++) {
        let fila = document.createElement("tr");
        cuerpo.appendChild(fila);
        for (d = 0; d < 7; d++) {
          let dia = document.createElement("td");
          dia.innerText = "";
          fila.appendChild(dia);
        }     
      }    
    }
  } estructurar();
  
 
  
  function numerar() {
    for (i = 1; i < 366; i++) {
      let fecha = fechaPorDia(2019, i);
      let mes = fecha.getMonth();
      let select_tabla = document.getElementsByClassName('table')[mes];
      let dia = fecha.getDate()
      let dia_semana = fecha.getDay();
      if (dia == 1) {var sem = 0;}
      select_tabla.children[2].children[sem].children[dia_semana].innerText = dia;
      if (dia_semana == 6) { sem = sem + 1; }
    }
  } numerar();
  
  function fechaPorDia(año, dia) {
    var date = new Date(año, 0);
    return new Date(date.setDate(dia));
  }
}());

/**
 * Select a table cell
 * @param {event} event
 * @returns {boolean}
 */
function selectCell (event, element = null) {
  let td = element ? element : event.target;

  if(td.tagName !== 'TD') return false;

  // td.setAttribute('tabindex', 0);
  td.classList.toggle('selected-cell');

  if(this.selectedCell) this.selectedCell.classList.remove('selected-cell');
  this.selectedCell = td;

  // publish the selected cell
  Mediator.Publish(Table.Subscriptions.CELL_SELECTED, {td: this.selectedCell});
}
function _navigate (row, col) {
  let coords = this.selectedCell.getAttribute('data-cell')
      .split(':')
      .map(c => parseInt(c));

  // finds the td on the table
  let td = document.querySelector(`td[data-cell="${coords[0]+row}:${coords[1]+col}"]`);
  if(!td) return;
  // td.focus();

  // select the td
  this.selectCell(null, td);

  // this.selectedCell.classList.remove('selected-cell');
  // td.classList.add('selected-cell');
  // this.selectedCell = td;
}