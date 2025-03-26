"use client"
import Placar from "@/Components/Placar";
import Dado from "../Components/Dado"
import { useState, useEffect } from "react";
import React from "react";
import Rodada from "@/Components/Rodada";

export default function Home() {
  const [valor1, setValor] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [pontuacao1, setPontuacao1] = useState(0);
  const [pontuacao2, setPontuacao2] = useState(0);
  const [rodada, setRodada] = useState(1);

  function reiniciarEstado() {
    setValor(0)
    setValor2(0)
    setPontuacao1(0)
    setPontuacao2(0)
    setRodada(1)
  }

  function reiniciarValor() {
    if(rodada > 5){
      return
    }
    setValor(0)
    setValor2(0)
  }

  const rolarDado = () => {
    if (rodada > 5) {
      return
    }
    const novoValor = Math.floor(Math.random() * 6) + 1;
    setValor(novoValor);
  };

  const rolarDado2 = () => {
    if (valor1 === 0){
      return
    }

    if (rodada > 5) {
      return
    }

    const novoValor = Math.floor(Math.random() * 6) + 1;
    if (novoValor < valor1) {
      const novaPontuacao = pontuacao1 + 1
      setPontuacao1(novaPontuacao)
    } else if(novoValor === valor1){
      const novaPontuacao1 = pontuacao1 + 1
      const novaPontuacao2 = pontuacao2 + 1
      setPontuacao1(novaPontuacao1)
      setPontuacao2(novaPontuacao2)
    } else {
      const novaPontuacao = pontuacao2 + 1
      setPontuacao2(novaPontuacao)
    }
    setValor2(novoValor);
    setTimeout(() => { 
      reiniciarValor();
    }, 700);
    const rodadaAtual = rodada + 1
    setRodada(rodadaAtual)
  };

  // useEffect(() => {
  //   if (valor1 !== 0 && valor2 !== 0) {
  //     if (valor1 > valor2) {
  //       setPontuacao1((prev) => prev + 1);
  //     } else if (valor1 === valor2) {
  //       setPontuacao1((prev) => prev + 1);
  //       setPontuacao2((prev) => prev + 1);
  //     } else {
  //       setPontuacao2((prev) => prev + 1);
  //     }
  //   }
  // }, [valor2]);
  
  let vencedor;
  if (pontuacao1 > pontuacao2) {
    vencedor = "Jogador 1 venceu!"
  } else if(pontuacao1 === pontuacao2) {
    vencedor = "Empate"
  } else {
    vencedor = "Jogador 2 venceu!"
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      {
        rodada > 5 ? <h1>Fim, {vencedor}</h1> : <Rodada rodada={rodada} />
      }
      

      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <Dado valor={valor1} />
          <button
            onClick={rolarDado}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Rolar Dado
          </button>
        </div>

        <div className="flex flex-col items-center">
          <Dado valor={valor2} />
          <button
            onClick={rolarDado2}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Rolar Dado
          </button>
        </div>
      </div>

      <Placar pontuacao1={pontuacao1} pontuacao2={pontuacao2} />

      {rodada > 5 && (
        <button
          onClick={reiniciarEstado}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Jogar Novamente
        </button>
      )}
    </div>
  );
}
