"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Zap, Timer, Play } from "lucide-react"

interface QuickWorkoutProps {
  onBack: () => void
}

interface Exercise {
  name: string
  duration: string
  rest: string
  image: string
}

export default function QuickWorkout({ onBack }: QuickWorkoutProps) {
  const [step, setStep] = useState<"form" | "result">("form")
  const [bodyPart, setBodyPart] = useState("")
  const [level, setLevel] = useState("")
  const [workout, setWorkout] = useState<Exercise[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const generateQuickWorkout = () => {
    const workouts: Record<string, Exercise[]> = {
      braco: [
        {
          name: "Flexão de Braço",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop"
        },
        {
          name: "Tríceps no Banco",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop"
        },
        {
          name: "Rosca Isométrica",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop"
        },
        {
          name: "Flexão Diamante",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
        }
      ],
      perna: [
        {
          name: "Agachamento",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop"
        },
        {
          name: "Avanço Alternado",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
        },
        {
          name: "Ponte de Glúteo",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
        },
        {
          name: "Agachamento Sumô",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop"
        }
      ],
      abdomen: [
        {
          name: "Prancha",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
        },
        {
          name: "Abdominal Bicicleta",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
        },
        {
          name: "Elevação de Pernas",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
        },
        {
          name: "Mountain Climbers",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
        }
      ],
      corpo: [
        {
          name: "Burpees",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
        },
        {
          name: "Agachamento com Salto",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop"
        },
        {
          name: "Flexão de Braço",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop"
        },
        {
          name: "Prancha com Toque",
          duration: "40s",
          rest: "20s",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
        }
      ]
    }

    setWorkout(workouts[bodyPart] || workouts.corpo)
    setStep("result")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (bodyPart && level) {
      generateQuickWorkout()
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
            <Zap className="w-8 h-8 text-green-500" />
            <h2 className="text-3xl font-bold text-gray-800">Treino em 10 Minutos</h2>
          </div>
          <p className="text-gray-600">Circuito rápido e eficiente</p>
        </div>

        {/* Timer Card */}
        <Card className="max-w-2xl mx-auto p-6 mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400">
          <div className="text-center">
            <Timer className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">10:00</h3>
            <p className="text-gray-600 mb-4">Tempo total do treino</p>
            <Button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-6 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              {isPlaying ? "Pausar Treino" : "Iniciar Treino"}
            </Button>
          </div>
        </Card>

        {/* Exercícios */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Exercícios do Circuito</h3>
          {workout.map((exercise, idx) => (
            <Card key={idx} className="p-4 border-2 border-gray-200 hover:border-green-400 transition-all">
              <div className="flex gap-4">
                <img 
                  src={exercise.image} 
                  alt={exercise.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{exercise.name}</h4>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      <span className="font-medium">Execução: {exercise.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      <span className="font-medium">Descanso: {exercise.rest}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Instruções */}
        <Card className="max-w-2xl mx-auto mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-gray-800 mb-3">📋 Como fazer:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Execute cada exercício por {workout[0]?.duration}</li>
            <li>• Descanse {workout[0]?.rest} entre exercícios</li>
            <li>• Complete 2 rodadas do circuito</li>
            <li>• Mantenha boa postura durante todo o treino</li>
            <li>• Hidrate-se antes e depois</li>
          </ul>
        </Card>

        {/* Mensagem Motivacional */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-none">
            <p className="text-lg text-gray-700 font-medium">
              💪 "10 minutos de treino é melhor que 0 minutos!"
            </p>
          </Card>
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
          <Zap className="w-8 h-8 text-green-500" />
          <h2 className="text-3xl font-bold text-gray-800">Treino em 10 Minutos</h2>
        </div>
        <p className="text-gray-600">Escolha a parte do corpo e seu nível</p>
      </div>

      <Card className="max-w-2xl mx-auto p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Parte do Corpo */}
          <div>
            <Label className="text-lg font-bold text-gray-800 mb-4 block">
              Qual parte do corpo você quer treinar?
            </Label>
            <RadioGroup value={bodyPart} onValueChange={setBodyPart}>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-400 cursor-pointer">
                  <RadioGroupItem value="braco" id="braco" />
                  <Label htmlFor="braco" className="cursor-pointer flex-1">Braços</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-400 cursor-pointer">
                  <RadioGroupItem value="perna" id="perna" />
                  <Label htmlFor="perna" className="cursor-pointer flex-1">Pernas</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-400 cursor-pointer">
                  <RadioGroupItem value="abdomen" id="abdomen" />
                  <Label htmlFor="abdomen" className="cursor-pointer flex-1">Abdômen</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-400 cursor-pointer">
                  <RadioGroupItem value="corpo" id="corpo" />
                  <Label htmlFor="corpo" className="cursor-pointer flex-1">Corpo Todo</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Nível */}
          <div>
            <Label className="text-lg font-bold text-gray-800 mb-4 block">
              Qual é o seu nível?
            </Label>
            <RadioGroup value={level} onValueChange={setLevel}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-400 cursor-pointer">
                  <RadioGroupItem value="iniciante" id="level-iniciante" />
                  <Label htmlFor="level-iniciante" className="cursor-pointer flex-1">Iniciante</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-400 cursor-pointer">
                  <RadioGroupItem value="medio" id="medio" />
                  <Label htmlFor="medio" className="cursor-pointer flex-1">Médio</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-green-400 cursor-pointer">
                  <RadioGroupItem value="avancado" id="level-avancado" />
                  <Label htmlFor="level-avancado" className="cursor-pointer flex-1">Avançado</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-6 text-lg"
            disabled={!bodyPart || !level}
          >
            <Zap className="w-5 h-5 mr-2" />
            Gerar Treino de 10 Minutos
          </Button>
        </form>
      </Card>
    </div>
  )
}
