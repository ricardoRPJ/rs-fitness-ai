"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Sparkles, Crown, Lock } from "lucide-react"

interface WorkoutCreatorProps {
  onBack: () => void
}

interface WorkoutParams {
  goal: string
  location: string
  time: string
  level: string
  equipment: string
}

interface Exercise {
  name: string
  sets: string
  reps: string
  rest: string
  image: string
}

interface WorkoutDay {
  day: number
  title: string
  duration: string
  exercises: Exercise[]
}

export default function WorkoutCreator({ onBack }: WorkoutCreatorProps) {
  const [step, setStep] = useState<"form" | "result">("form")
  const [params, setParams] = useState<WorkoutParams>({
    goal: "",
    location: "",
    time: "",
    level: "",
    equipment: ""
  })
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([])
  const [showPremiumBlock, setShowPremiumBlock] = useState(false)

  const generateWorkout = () => {
    // Simulação de geração de treino com IA
    const workouts: WorkoutDay[] = [
      {
        day: 1,
        title: params.goal === "hipertrofia" ? "Treino de Pernas" : params.goal === "emagrecimento" ? "Treino Cardio + Força" : "Treino de Resistência",
        duration: params.time,
        exercises: [
          {
            name: "Agachamento",
            sets: "3",
            reps: "12",
            rest: "45s",
            image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop"
          },
          {
            name: "Avanço",
            sets: "3",
            reps: "10 cada perna",
            rest: "45s",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
          },
          {
            name: "Elevação de Panturrilha",
            sets: "4",
            reps: "15",
            rest: "30s",
            image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop"
          },
          {
            name: "Ponte de Glúteo",
            sets: "3",
            reps: "15",
            rest: "45s",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
          }
        ]
      },
      {
        day: 2,
        title: params.goal === "hipertrofia" ? "Treino de Peito e Tríceps" : params.goal === "emagrecimento" ? "Treino HIIT" : "Treino de Força",
        duration: params.time,
        exercises: [
          {
            name: "Flexão de Braço",
            sets: "3",
            reps: "12",
            rest: "45s",
            image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop"
          },
          {
            name: "Tríceps no Banco",
            sets: "3",
            reps: "10",
            rest: "45s",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop"
          },
          {
            name: "Flexão Diamante",
            sets: "3",
            reps: "8",
            rest: "60s",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
          },
          {
            name: "Mergulho",
            sets: "3",
            reps: "12",
            rest: "45s",
            image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop"
          }
        ]
      }
    ]

    setWorkoutPlan(workouts)
    setStep("result")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (params.goal && params.location && params.time && params.level && params.equipment) {
      generateWorkout()
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
            <Sparkles className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-800">Seu Treino Personalizado</h2>
          </div>
          <p className="text-gray-600">Treinos gerados para os próximos 2 dias (Plano Gratuito)</p>
        </div>

        {/* Treinos dos 2 dias */}
        <div className="space-y-8 mb-8">
          {workoutPlan.map((workout) => (
            <Card key={workout.day} className="p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Dia {workout.day}</h3>
                  <p className="text-lg text-blue-600 font-medium">{workout.title}</p>
                  <p className="text-sm text-gray-500">Duração: {workout.duration} minutos</p>
                </div>
              </div>

              <div className="space-y-4">
                {workout.exercises.map((exercise, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={exercise.image} 
                      alt={exercise.name}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">{exercise.name}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="font-medium">Séries: {exercise.sets}</span>
                        <span className="font-medium">Repetições: {exercise.reps}</span>
                        <span className="font-medium">Descanso: {exercise.rest}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Bloqueio Premium */}
        <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-400 text-center">
          <Lock className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Desbloqueie o Plano Completo
          </h3>
          <p className="text-gray-600 mb-6">
            Acesse treinos para a semana inteira, histórico de evolução e muito mais!
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6 text-left">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-800">Treinos Ilimitados</span>
              </div>
              <p className="text-sm text-gray-600">Gere quantos treinos quiser</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-800">Plano Semanal</span>
              </div>
              <p className="text-sm text-gray-600">Treinos para 7 dias completos</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-800">Histórico</span>
              </div>
              <p className="text-sm text-gray-600">Acompanhe sua evolução</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowPremiumBlock(true)}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-8 py-6 text-lg"
          >
            <Crown className="w-5 h-5 mr-2" />
            Fazer Upgrade Agora
          </Button>
        </Card>

        {/* Modal Premium */}
        {showPremiumBlock && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full p-6 relative">
              <button 
                onClick={() => setShowPremiumBlock(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              
              <div className="text-center mb-6">
                <Crown className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Upgrade para Premium</h2>
                <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
              </div>
              
              <Button 
                onClick={() => setShowPremiumBlock(false)}
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
          <Sparkles className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-gray-800">Criar Treino com IA</h2>
        </div>
        <p className="text-gray-600">Responda algumas perguntas para gerar seu treino personalizado</p>
      </div>

      <Card className="max-w-2xl mx-auto p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Objetivo */}
          <div>
            <Label className="text-lg font-bold text-gray-800 mb-4 block">
              Qual é o seu objetivo?
            </Label>
            <RadioGroup value={params.goal} onValueChange={(value) => setParams({...params, goal: value})}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="emagrecimento" id="emagrecimento" />
                  <Label htmlFor="emagrecimento" className="cursor-pointer flex-1">Emagrecimento</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="hipertrofia" id="hipertrofia" />
                  <Label htmlFor="hipertrofia" className="cursor-pointer flex-1">Hipertrofia (Ganho de Massa)</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="resistencia" id="resistencia" />
                  <Label htmlFor="resistencia" className="cursor-pointer flex-1">Resistência</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Local */}
          <div>
            <Label className="text-lg font-bold text-gray-800 mb-4 block">
              Onde você vai treinar?
            </Label>
            <RadioGroup value={params.location} onValueChange={(value) => setParams({...params, location: value})}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="casa" id="casa" />
                  <Label htmlFor="casa" className="cursor-pointer flex-1">Em Casa</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="academia" id="academia" />
                  <Label htmlFor="academia" className="cursor-pointer flex-1">Na Academia</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Tempo */}
          <div>
            <Label className="text-lg font-bold text-gray-800 mb-4 block">
              Quanto tempo você tem por dia?
            </Label>
            <Select value={params.time} onValueChange={(value) => setParams({...params, time: value})}>
              <SelectTrigger className="w-full p-4 text-base">
                <SelectValue placeholder="Selecione o tempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 minutos</SelectItem>
                <SelectItem value="20">20 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="45">45 minutos</SelectItem>
                <SelectItem value="60">60 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nível */}
          <div>
            <Label className="text-lg font-bold text-gray-800 mb-4 block">
              Qual é o seu nível?
            </Label>
            <RadioGroup value={params.level} onValueChange={(value) => setParams({...params, level: value})}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="iniciante" id="iniciante" />
                  <Label htmlFor="iniciante" className="cursor-pointer flex-1">Iniciante</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="intermediario" id="intermediario" />
                  <Label htmlFor="intermediario" className="cursor-pointer flex-1">Intermediário</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                  <RadioGroupItem value="avancado" id="avancado" />
                  <Label htmlFor="avancado" className="cursor-pointer flex-1">Avançado</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Equipamentos */}
          <div>
            <Label className="text-lg font-bold text-gray-800 mb-4 block">
              Quais equipamentos você tem?
            </Label>
            <Select value={params.equipment} onValueChange={(value) => setParams({...params, equipment: value})}>
              <SelectTrigger className="w-full p-4 text-base">
                <SelectValue placeholder="Selecione os equipamentos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nenhum">Nenhum (Peso Corporal)</SelectItem>
                <SelectItem value="halteres">Halteres</SelectItem>
                <SelectItem value="elasticos">Elásticos</SelectItem>
                <SelectItem value="barras">Barras</SelectItem>
                <SelectItem value="maquinas">Máquinas (Academia)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-6 text-lg"
            disabled={!params.goal || !params.location || !params.time || !params.level || !params.equipment}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Gerar Treino Personalizado
          </Button>
        </form>
      </Card>
    </div>
  )
}
