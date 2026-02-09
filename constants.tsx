
import { Question, QuestionStatus } from './types';

const PHYSICS_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: 'Physics',
    text: "Assertion (A) : The outer body of an aircraft is made of metal which protects persons sitting inside from lightning-strikes.\nReason (R) : The electric field inside the cavity enclosed by a conductor is zero.\n\nIn the light of the above statements, choose the most appropriate answer:",
    options: [
      "(A) Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "(B) (A) is correct but (R) is not correct",
      "(C) Both (A) and (R) are correct but (R) is not correct explanation of (A)",
      "(D) (A) is not correct but (R) is correct"
    ],
    correctAnswer: 0,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Electrostatic shielding: Inside a conductor, the electric field is zero. The metal body acts as a Faraday cage, protecting the interior from external electrical discharges like lightning."
  },
  {
    id: 2,
    subject: 'Physics',
    text: "The dimension of √(μ₀/ε₀) is equal to that of: (μ₀ = Vacuum permeability and ε₀ = Vacuum permittivity)",
    options: ["Voltage", "Capacitance", "Inductance", "Resistance"],
    correctAnswer: 3,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "The quantity √(μ₀/ε₀) is known as the intrinsic impedance of free space, which has the dimension of resistance (approximately 377 Ohms)."
  },
  {
    id: 3,
    subject: 'Physics',
    text: "A mirror is used to produce an image with magnification of 1/4. If the distance between object and its image is 40 cm, then the focal length of the mirror is?",
    options: ["10 cm", "12.7 cm", "10.7 cm", "15 cm"],
    correctAnswer: 2,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Using mirror formula (1/v + 1/u = 1/f) and magnification (m = -v/u = 1/4). Solving these equations with distance |v - u| = 40 cm leads to f ≈ 10.7 cm."
  },
  {
    id: 4,
    subject: 'Physics',
    text: "Assertion (A): The density of the copper nucleus (⁶⁴₂₉Cu) is greater than that of the carbon nucleus (¹²₆C).\nReason (R): The nucleus of mass number A has a radius proportional to A¹/³.",
    options: [
      "(A) (A) is correct but (R) is not correct",
      "(B) (A) is not correct but (R) is correct",
      "(C) Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "(D) Both (A) and (R) are correct but (R) is not the correct explanation of (A)"
    ],
    correctAnswer: 1,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Nuclear density is independent of mass number A. All nuclei have approximately the same density. The reason is correct (R ∝ A¹/³), but the assertion is false."
  },
  {
    id: 5,
    subject: 'Physics',
    text: "A river is flowing from west to east direction with speed of 9 km/h. If a boat capable of moving at a maximum speed of 27 km/h in still water, crosses the river in half a minute, while moving with maximum speed at an angle of 150° to direction of river flow, then the width of the river is:",
    options: ["300 m", "112.5 m", "75 m", "112.5 * √3 m"],
    correctAnswer: 1,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Vertical component of boat velocity = V_boat * sin(150°) = 27 * (1/2) = 13.5 km/h. Time = 0.5 min = 1/120 hour. Width = Velocity * Time = 13.5 * (1/120) km = 0.1125 km = 112.5 m."
  }
];

const CHEMISTRY_QUESTIONS: Question[] = [
  {
    id: 31,
    subject: 'Chemistry',
    text: "Mixture of 1 g each of chlorobenzene, aniline and benzoic acid is dissolved in 50 mL ethyl acetate and placed in a separating funnel, 5 M NaOH (30 mL) was added. The ethyl acetate layer in the funnel contains:",
    options: [
      "benzoic acid",
      "benzoic acid and aniline",
      "benzoic acid and chlorobenzene",
      "chlorobenzene and aniline"
    ],
    correctAnswer: 3,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "NaOH reacts with benzoic acid to form sodium benzoate (water-soluble). Aniline (basic) and chlorobenzene (neutral) remain in the organic ethyl acetate layer."
  },
  {
    id: 32,
    subject: 'Chemistry',
    text: "The hydration energies of K⁺ and Cl⁻ are -x and -y kJ/mol respectively. If lattice energy of KCl is -z kJ/mol, then the heat of solution of KCl is:",
    options: ["+x - y - z", "x + y + z", "z - (x + y)", "-z - (x + y)"],
    correctAnswer: 2,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "ΔH_sol = ΔH_lattice (dissociation) + ΔH_hyd. Here, Lattice energy (forming) = -z, so dissociation = +z. ΔH_sol = z + (-x) + (-y) = z - (x + y)."
  },
  {
    id: 33,
    subject: 'Chemistry',
    text: "Choose the incorrect trend in the atomic radii (r) of the elements:",
    options: ["rBr < rK", "rMg < rAl", "rRb < rCs", "rAt < rCs"],
    correctAnswer: 1,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Across a period (left to right), atomic radius decreases due to increase in effective nuclear charge. So, Mg is larger than Al. rMg < rAl is incorrect."
  },
  {
    id: 34,
    subject: 'Chemistry',
    text: "In SO₂, NO₂⁻ and N₃⁻ the hybridizations at the central atom are respectively:",
    options: ["sp², sp² and sp", "sp², sp and sp", "sp², sp² and sp²", "sp, sp² and sp"],
    correctAnswer: 0,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "SO₂: sp² (bent), NO₂⁻: sp² (bent), N₃⁻: sp (linear). Hybridization is determined by Steric Number."
  },
  {
    id: 35,
    subject: 'Chemistry',
    text: "Assertion (A): The metallic radius of Al is less than that of Ga.\nStatement (II): The ionic radius of Al³⁺ is less than that of Ga³⁺.",
    options: [
      "(A) Both Statement I and Statement II are incorrect",
      "(B) Statement I is incorrect but Statement II is correct",
      "(C) Statement I is correct but Statement II is incorrect",
      "(D) Both Statement I and Statement II are correct"
    ],
    correctAnswer: 1,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Ga radius is actually slightly smaller than Al due to d-block contraction (poor shielding by 10 d-electrons). Statement I is incorrect. However, Al³⁺ is smaller than Ga³⁺ because Ga³⁺ has one more shell."
  }
];

const MATH_QUESTIONS: Question[] = [
  {
    id: 61,
    subject: 'Mathematics',
    text: "If the range of the function f(x) = (5-x)/(x²-3x+2), x ≠ 1, 2 is (-∞, α] ∪ [β, ∞), then α² + β² is equal to:",
    options: ["190", "192", "188", "194"],
    correctAnswer: 3,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Let y = (5-x)/(x²-3x+2). Form a quadratic in x: yx² + (1-3y)x + (2y-5) = 0. For real x, Discriminant D ≥ 0. Solving D ≥ 0 for y gives the range boundary values α and β."
  },
  {
    id: 62,
    subject: 'Mathematics',
    text: "Let a and b be vectors of the same magnitude such that |a+b|/|a-b| = √2 + 1. Then |a+b|²/|a|² is:",
    options: ["2 + 4√2", "1 + √2", "2 + √2", "4 + 2√2"],
    correctAnswer: 2,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Let |a|=|b|=k. |a+b|² = 2k²(1+cosθ), |a-b|² = 2k²(1-cosθ). Use the ratio to find θ and then calculate |a+b|²/k²."
  },
  {
    id: 63,
    subject: 'Mathematics',
    text: "If the orthocentre of the triangle formed by the lines y = x + 1, y = 4x - 8 and y = mx + c is at (3, -1), then m - c is:",
    options: ["0", "-2", "4", "2"],
    correctAnswer: 0,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Orthocentre (3, -1) lies on the altitudes. Calculate vertices and check property that altitude from vertex to opposite side is perpendicular."
  },
  {
    id: 64,
    subject: 'Mathematics',
    text: "The number of real roots of the equation x|x-2| + 3|x-3| + 1 = 0 is:",
    options: ["4", "2", "1", "3"],
    correctAnswer: 2,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Analyze the equation in different intervals: x<2, 2≤x<3, x≥3. In each interval, the expression remains positive (no roots) except for one point resulting in 1 real root."
  },
  {
    id: 65,
    subject: 'Mathematics',
    text: "If the sum of the second, fourth and sixth terms of a G.P. of positive terms is 21 and the sum of its eighth, tenth and twelfth terms is 15309, then the sum of its first nine terms is:",
    options: ["760", "755", "750", "757"],
    correctAnswer: 3,
    selectedAnswer: null,
    status: QuestionStatus.NOT_VISITED,
    explanation: "Let GP be a, ar, ar²... Second, fourth, sixth: ar + ar³ + ar⁵ = 21. Eighth, tenth, twelfth: ar⁷ + ar⁹ + ar¹¹ = 15309. Dividing gives r⁶ = 729 => r = 3. Find 'a' and then sum of 9 terms."
  }
];

export const MOCK_QUESTIONS: Question[] = [
  ...Array.from({ length: 30 }, (_, i) => ({
    ...(PHYSICS_QUESTIONS[i % PHYSICS_QUESTIONS.length]),
    id: i + 1
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    ...(CHEMISTRY_QUESTIONS[i % CHEMISTRY_QUESTIONS.length]),
    id: i + 31
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    ...(MATH_QUESTIONS[i % MATH_QUESTIONS.length]),
    id: i + 61
  }))
];

export const STATUS_COLORS = {
  [QuestionStatus.NOT_VISITED]: 'bg-zinc-800 text-zinc-400',
  [QuestionStatus.NOT_ANSWERED]: 'bg-red-500/20 text-red-400 border border-red-500/50',
  [QuestionStatus.ANSWERED]: 'bg-emerald-500 text-white',
  [QuestionStatus.MARKED_FOR_REVIEW]: 'bg-indigo-600 text-white rounded-full',
  [QuestionStatus.ANSWERED_AND_MARKED]: 'bg-indigo-600 text-white rounded-full relative after:content-["✓"] after:absolute after:-top-1 after:-right-1 after:text-[10px] after:bg-emerald-500 after:rounded-full after:w-4 after:h-4 after:flex after:items-center after:justify-center',
};
