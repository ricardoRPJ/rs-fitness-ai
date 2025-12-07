"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, AlertTriangle } from "lucide-react"

interface LoadCalculatorProps {
  onBack: () => void
}

interface ProgressionWeek {
  week: number
  load: number
  reps: number
  notes: string
}

export default function LoadCalculator({ onBack }: LoadCalculatorProps) {
  const [step, setStep] = useState<"form" | "result">("form")
  const [exercise, setExercise] = useState("")
  const [currentLoad, setCurrentLoad] = useState("")
  const [currentReps, setCurrentReps] = useState("")
  const [frequency, setFrequency] = useState("")
  const [progression, setProgression] = useState<ProgressionWeek[]>([])
  const [showWarning, setShowWarning] = useState(false)

  const calculateProgression = () => {
    const load = parseFloat(currentLoad)
    const reps = parseInt(currentReps)
    const freq = parseInt(frequency)

    // Cálculo de progressão baseado em frequência e nível
    const weeklyIncrease = freq >= 3 ? 2.5 : 1.5 // kg por semana
    const weeks: ProgressionWeek[] = []

    for (let i = 1; i <= 8; i++) {
      const newLoad = load + (weeklyIncrease * i)
      let newReps = reps
      let notes = ""

      // Ajuste de repetições conforme carga aumenta
      if (i % 2 === 0 && reps > 8) {
        newReps = reps - 1
        notes = "Reduzir repetições para manter qualidade"
      }

      // Alerta de sobrecarga
      if (i >= 6 && freq < 2) {
        notes = "⚠️ Considere aumentar frequência semanal"
        setShowWarning(true)
      }

      // Semana de deload
      if (i === 4 || i === 8) {
        notes = "Semana de recuperação - manter carga"
      }

      weeks.push({
        week: i,
        load: parseFloat(newLoad.toFixed(1)),
        reps: newReps,
        notes: notes || "Progressão normal"
      })
    }

    setProgression(weeks)
    setStep("result")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (exercise && currentLoad && currentReps && frequency) {
      calculateProgression()
    }
  }

  if (step === "result") {
    return (
      <div>
        <Button 
          onClick={onBack}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-gray-800">Progressão de Carga</h2>
          </div>
          <p className="text-gray-600">Plano de progressão para {exercise}</p>
        </div>

        {/* Resumo Atual */}
        <Card className="max-w-4xl mx-auto p-6 mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-400">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Carga Atual</p>
              <p className="text-3xl font-bold text-gray-800">{currentLoad}kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Repetições</p>
              <p className="text-3xl font-bold text-gray-800">{currentReps}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Frequência Semanal</p>
              <p className="text-3xl font-bold text-gray-800">{frequency}x</p>
            </div>
          </div>
        </Card>

        {/* Alerta de Sobrecarga */}
        {showWarning && (
          <Card className="max-w-4xl mx-auto p-4 mb-8 bg-orange-50 border-2 border-orange-400">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-orange-800">Atenção: Risco de Sobrecarga</p>
                <p className="text-sm text-orange-700">
                  Com frequência baixa, o aumento de carga pode ser excessivo. Considere treinar mais vezes por semana.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Tabela de Progressão */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Plano de 8 Semanas</h3>
          <div className="space-y-3">
            {progression.map((week) => (
              <Card 
                key={week.week} 
                className={`p-4 border-2 ${
                  week.week === 4 || week.week === 8 
                    ? 'bg-blue-50 border-blue-400' 
                    : 'border-gray-200 hover:border-purple-400'
                } transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 text-purple-700 font-bold px-4 py-2 rounded-lg">
                      Semana {week.week}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">
                        {week.load}kg × {week.reps} repetições
                      </p>
                      <p className="text-sm text-gray-600">{week.notes}</p>
                    </div>
                  </div>
                  {(week.week === 4 || week.week === 8) && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Deload
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <Card className="max-w-4xl mx-auto mt-8 p-6 bg-purple-50 border-purple-200">
          <h3 className="font-bold text-gray-800 mb-3">💡 Dicas Importantes:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Sempre priorize a técnica correta sobre a carga</li>
            <li>• Se não conseguir completar as repetições, mantenha a carga anterior</li>
            <li>• Respeite as semanas de deload para recuperação</li>
            <li>• Aumente a frequência semanal para melhores resultados</li>
            <li>• Consulte um profissional para ajustes personalizados</li>
          </ul>
        </Card>

        {/* Botão Nova Calculação */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Button 
            onClick={() => {
              setStep("form")
              setExercise("")
              setCurrentLoad("")
              setCurrentReps("")
              setFrequency("")
              setProgression([])
              setShowWarning(false)
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-6 text-lg"
          >
            Calcular Outro Exercício
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Button 
        onClick={onBack}
        variant="ghost"
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="w-8 h-8 text-purple-500" />
          <h2 className="text-3xl font-bold text-gray-800">Calculadora de Progressão</h2>
        </div>
        <p className="text-gray-600">Calcule o aumento ideal de carga nos seus exercícios</p>
      </div>

      <Card className="max-w-2xl mx-auto p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Exercício */}
          <div>
            <Label className="text-base font-bold text-gray-800 mb-2 block">
              Qual exercício?
            </Label>
            <Select value={exercise} onValueChange={setExercise}>
              <SelectTrigger className="w-full p-4 text-base">
                <SelectValue placeholder="Selecione o exercício" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supino">Supino Reto</SelectItem>
                <SelectItem value="agachamento">Agachamento</SelectItem>
                <SelectItem value="levantamento">Levantamento Terra</SelectItem>
                <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
                <SelectItem value="rosca">Rosca Direta</SelectItem>
                <SelectItem value="triceps">Tríceps Testa</SelectItem>
                <SelectItem value="leg-press">Leg Press</SelectItem>
                <SelectItem value="remada">Remada Curvada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Carga Atual */}
          <div>
            <Label className="text-base font-bold text-gray-800 mb-2 block">
              Carga atual (kg)
            </Label>
            <Input 
              type="number"
              step="0.5"
              placeholder="Ex: 40"
              value={currentLoad}
              onChange={(e) => setCurrentLoad(e.target.value)}
              className="p-4 text-base"
            />
          </div>

          {/* Repetições Atuais */}
          <div>
            <Label className="text-base font-bold text-gray-800 mb-2 block">
              Repetições atuais
            </Label>
            <Input 
              type="number"
              placeholder="Ex: 10"
              value={currentReps}
              onChange={(e) => setCurrentReps(e.target.value)}
              className="p-4 text-base"
            />
          </div>

          {/* Frequência Semanal */}
          <div>
            <Label className="text-base font-bold text-gray-800 mb-2 block">
              Quantas vezes por semana você treina este exercício?
            </Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="w-full p-4 text-base">
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1x por semana</SelectItem>
                <SelectItem value="2">2x por semana</SelectItem>
                <SelectItem value="3">3x por semana</SelectItem>
                <SelectItem value="4">4x ou mais por semana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-6 text-lg"
            disabled={!exercise || !currentLoad || !currentReps || !frequency}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Calcular Progressão
          </Button>
        </form>
      </Card>

      {/* Info Card */}
      <Card className="max-w-2xl mx-auto mt-8 p-6 bg-blue-50 border-blue-200">
        <h3 className="font-bold text-gray-800 mb-3">ℹ️ Como funciona:</h3>
        <p className="text-gray-700 mb-3">
          Nossa calculadora gera um plano de progressão de 8 semanas baseado em:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>• Sua carga e repetições atuais</li>
          <li>• Frequência de treino semanal</li>
          <li>• Princípios de sobrecarga progressiva</li>
          <li>• Semanas de deload para recuperação</li>
        </ul>
      </Card>
    </div>
  )
}
