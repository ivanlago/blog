"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TesteAnimacao() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-white text-center"
        >
          🎨 Teste de Animações
        </motion.h1>

        {/* Cards de teste */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
              className="bg-white rounded-2xl p-8 shadow-xl cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
                className="text-6xl mb-4"
              >
                {["🚀", "⚡", "✨"][i - 1]}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Card {i}</h3>
              <p className="text-gray-600">
                Passe o mouse aqui para ver a animação de hover!
              </p>
            </motion.div>
          ))}
        </div>

        {/* Botão pulsante */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(255,255,255,0.7)",
                "0 0 0 10px rgba(255,255,255,0)",
                "0 0 0 0 rgba(255,255,255,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-xl shadow-2xl"
          >
            Clique Aqui! 🎯
          </motion.button>
        </motion.div>

        {/* Texto flutuante */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          <p className="text-white text-xl font-semibold">
            ⬆️ Flutuando suavemente ⬆️
          </p>
        </motion.div>

        {/* Link de volta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <Link
            href="/"
            className="text-white underline text-lg hover:text-yellow-300 transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </motion.div>

        {/* Instruções */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">✅ Checklist:</h2>
          <ul className="space-y-2 text-lg">
            <li>□ Você viu o título aparecer?</li>
            <li>□ Os cards apareceram sequencialmente?</li>
            <li>□ Os cards fazem zoom no hover?</li>
            <li>□ O botão está pulsando?</li>
            <li>□ O texto está flutuando?</li>
          </ul>
          <p className="mt-4 text-yellow-200 font-semibold">
            Se você viu tudo isso, o Framer Motion está funcionando! 🎉
          </p>
        </motion.div>
      </div>
    </div>
  );
}

