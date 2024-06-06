<template>
    <div class="about">
      <h1>Lista de encomendas</h1>
      <!--<input type="text" v-model="nome" /> 
      <p v-if="nome.length > 5">Nome grande</p>
      <p v-else>Nome pequeno</p>-->
  
      <!-- Retornando dados do BackEnd e BD -->
      <!-- Inputs para nome e senha -->
      <p><label for="nome">Conteudo: </label> <input id="nome" type="text" v-model="conteudo" /></p>
      <p><label for="senha">Valor Declarado: </label> <input id="valorDeclarado" type="text" v-model="valorDeclarado" /></p>
      <p><label for="senha">Data Prevista Entrega: </label> <input id="dataHoraPrevista" type="text" v-model="dataHoraPrevista" /></p>
      <p><button @click="cadastrar">Cadastrar</button>
      <button @click="atualizar">Buscar</button></p>
      <p v-if="erro">{{ erro }}</p>
  
      <!-- Tabela de usuários -->
      <table>
        <head>
          <td>Cod</td>
          <td>Conteúdo</td>
          <td>Valor_Declarado</td>
          <td>Status</td>
        </head>
        <tr v-for="encomenda in encomendas">
          <td>{{ encomenda.rastreio }}</td>
          <td>{{ encomenda.conteudo }}</td>
          <td>{{ encomenda.valorDeclarado }}</td>
          <td v-if="encomenda.dataHoraEntrega === null">Pendente</td>
          <td v-else-if="encomenda.dataHoraEntrega > encomenda.dataHoraPrevista">Entrega com atraso</td>
          <td v-else>Entrega OK</td>
        </tr>
      </table>
    </div>
  </template> 
  
  <!-- Retornando dados do BackEnd e BD -->
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  
  const conteudo = ref(""); //traz componente e adiciona uma ref p.ex.: Nome: [Nome     ];
  const valorDeclarado = ref("1500.00");
  const dataHoraPrevista = ref("2024-05-27T12:00:00");
  const erro = ref();
  const encomendas = ref();
  
  async function atualizar() {
    try{ //utilizando try/catch, tratamento de erros.
    encomendas.value = (await axios.get("encomenda")).data; //aqui a chamada com a URL completa antes da base no main.ts.
    } 
    catch(ex){
      erro.value = (ex as Error).message;
    }
  } //Aqui estamos trazendo os valores para a tabela abaixo do campo nome/senha
  
  //Abaixo iremos realizar a função para o botão cadastrar e após cadastrados o item deverá aparecer na
  //tabela de de visualização, item acima.
  async function cadastrar() {
    try{
    await axios.post("encomenda", //Aqui a URL está usando a base do main.ts, assim informamos apenas a chamada do serviço.
      {
        conteudo: conteudo.value,
        valorDeclarado: valorDeclarado.value,
        dataHoraPrevista: dataHoraPrevista.value
      });
    }
    catch(ex){
      erro.value = (ex as Error).message;
    }
      atualizar(); //Chamando a função atualizar para poder mostra o item recém cadastrado na tabela.
        conteudo.value = "";
        valorDeclarado.value = "";
        dataHoraPrevista.value = "";
  
  }
  
  onMounted(() => {
    atualizar();
  });

  </script>
  <!--
  <style> //Bloco de estilos para ajustes com css.
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style> -->
  