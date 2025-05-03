"use client";

import { useState, useEffect } from "react";

const frases = [
    "La educación es el arma más poderosa que puedes usar para cambiar el mundo. — Nelson Mandela.",
    "El futuro pertenece a quienes creen en la belleza de sus sueños. — Eleanor Roosevelt.",
    "La educación no cambia el mundo, cambia a las personas que van a cambiar el mundo. — Paulo Freire.",
    "La inteligencia consiste no sólo en el conocimiento, sino también en la destreza de aplicar los conocimientos a la práctica. — Aristóteles.",
    "La única forma de hacer un gran trabajo es amar lo que haces. — Steve Jobs.",
    "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer. — John Wooden.",
    "Aprender es un regalo. Incluso cuando el dolor es tu maestro. — Maya Watson.",
    "El conocimiento es poder. La información es liberadora. — Kofi Annan.",
    "No he fracasado. He encontrado 10,000 formas que no funcionan. — Thomas Edison.",
    "La educación no es preparación para la vida; la educación es la vida misma. — John Dewey.",
    "Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el bello y maravilloso mundo del saber. — Albert Einstein.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. — Albert Schweitzer.",
    "Cree que puedes y ya habrás recorrido la mitad del camino. — Theodore Roosevelt.",
    "La educación es el pasaporte hacia el futuro, el mañana pertenece a aquellos que se preparan para él hoy. — Malcolm X.",
    "Tu actitud, no tu aptitud, determinará tu altitud. — Zig Ziglar.",
    "La mente es como un paracaídas, sólo funciona si se abre. — Albert Einstein.",
    "Invertir en conocimiento siempre produce los mejores intereses. — Benjamin Franklin.",
    "Si puedes soñarlo, puedes lograrlo. — Walt Disney.",
    "La forma de empezar es dejar de hablar y comenzar a hacer. — Walt Disney.",
    "La motivación nos impulsa a comenzar y el hábito nos permite continuar. — Jim Ryun.",
  ];
  

export function FraseMotivacional() {
  const [frase, setFrase] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * frases.length);
    setFrase(frases[random]);
  }, []);

  return (
    <h2 className="text-lg text-gray-400 font-light italic tracking-wide text-center">
      {frase}
    </h2>
  );
}
