"use client"

import { useState } from "react"
import { Dumbbell, Zap, TrendingUp, Sparkles, Crown, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import WorkoutCreator from "./components/WorkoutCreator"
import QuickWorkout from "./components/QuickWorkout"
import LoadCalculator from "./components/LoadCalculator"

type Screen = "onboarding" | "home" | "creator" | "quick" | "calculator"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding")
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  // Onboarding Screen
  if (currentScreen === "onboarding") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Dumbbell className="w-10 h-10 text-blue-500" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                RS Fitness AI
              </h1>
            </div>
            <p className="text-xl text-gray-600">Seu treino inteligente começa aqui.</p>
          </div>

          {/* Cards de Planos */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Plano Gratuito */}
            <Card className="p-6 border-2 border-gray-200 hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-800">Plano Gratuito</h3>
              </div>
              <p className="text-gray-600 mb-6">Acesso por 48h</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Treino gerado apenas para 2 dias</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Treino de 10 minutos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Calculadora de carga básica</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Plano semanal completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Histórico de evolução</span>
                </li>
              </ul>

              <Button 
                onClick={() => setCurrentScreen("home")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Começar no Gratuito
              </Button>
            </Card>

            {/* Plano Premium */}
            <Card className="p-6 border-2 border-green-400 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-bold">
                RECOMENDADO
              </div>
              
              <div className="flex items-center gap-2 mb-4 mt-2">
                <Crown className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800">Plano Premium</h3>
              </div>
              <p className="text-gray-600 mb-6">Acesso ilimitado</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Treinos ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Plano semanal completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Histórico de evolução</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Progressão de carga contínua</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Treinos salvos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Ajuste automático avançado</span>
                </li>
              </ul>

              <Button 
                onClick={() => setShowPremiumModal(true)}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold"
              >
                Quero o Premium
              </Button>
            </Card>
          </div>

          <p className="text-center text-sm text-gray-500">
            Comece gratuitamente e faça upgrade quando quiser
          </p>
        </div>

        {/* Modal Premium */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full p-6 relative">
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6">
                <Crown className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Upgrade para Premium</h2>
                <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
              </div>
              
              <Button 
                onClick={() => setShowPremiumModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Voltar
              </Button>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Home Screen
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                RS Fitness AI
              </h1>
            </div>
            <Button 
              onClick={() => setShowPremiumModal(true)}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <Crown className="w-4 h-4 mr-2" />
              Premium
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Escolha sua funcionalidade
            </h2>
            <p className="text-gray-600 text-lg">
              Treinos inteligentes adaptados para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Criar Treino com IA */}
            <Card 
              onClick={() => setCurrentScreen("creator")}
              className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-400"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Criar Treino com IA
              </h3>
              <p className="text-gray-600 mb-4">
                Treinos personalizados baseados no seu perfil e objetivos
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Começar
              </Button>
            </Card>

            {/* Treino em 10 Minutos */}
            <Card 
              onClick={() => setCurrentScreen("quick")}
              className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-green-400"
            >
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Treino em 10 Minutos
              </h3>
              <p className="text-gray-600 mb-4">
                Treinos rápidos e eficientes para fazer em casa
              </p>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Começar
              </Button>
            </Card>

            {/* Progressão de Carga */}
            <Card 
              onClick={() => setCurrentScreen("calculator")}
              className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-400"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Progressão de Carga
              </h3>
              <p className="text-gray-600 mb-4">
                Calcule o aumento ideal de peso nos seus exercícios
              </p>
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                Calcular
              </Button>
            </Card>
          </div>

          {/* Mensagem Motivacional */}
          <div className="mt-12 text-center">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-none">
              <p className="text-lg text-gray-700 font-medium">
                💪 "O único treino ruim é aquele que não aconteceu!"
              </p>
            </Card>
          </div>
        </main>

        {/* Modal Premium */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full p-6 relative">
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6">
                <Crown className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Upgrade para Premium</h2>
                <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
              </div>
              
              <Button 
                onClick={() => setShowPremiumModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Voltar
              </Button>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Outras telas
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => setCurrentScreen("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Dumbbell className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              RS Fitness AI
            </h1>
          </button>
          <Button 
            onClick={() => setShowPremiumModal(true)}
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            <Crown className="w-4 h-4 mr-2" />
            Premium
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentScreen === "creator" && <WorkoutCreator onBack={() => setCurrentScreen("home")} />}
        {currentScreen === "quick" && <QuickWorkout onBack={() => setCurrentScreen("home")} />}
        {currentScreen === "calculator" && <LoadCalculator onBack={() => setCurrentScreen("home")} />}
      </main>

      {/* Modal Premium */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <Crown className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Upgrade para Premium</h2>
              <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
            </div>
            
            <Button 
              onClick={() => setShowPremiumModal(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Voltar
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
