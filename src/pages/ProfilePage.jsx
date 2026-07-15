import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/profileApi';
import { X, Plus, User } from 'lucide-react';

const ACTIVITY_LEVELS = [
  { value: 'SEDENTARY', label: 'Sedentary (little to no exercise)' },
  { value: 'LIGHTLY_ACTIVE', label: 'Lightly Active (1-3 days/week)' },
  { value: 'MODERATELY_ACTIVE', label: 'Moderately Active (3-5 days/week)' },
  { value: 'VERY_ACTIVE', label: 'Very Active (6-7 days/week)' },
  { value: 'EXTRA_ACTIVE', label: 'Extra Active (physical job + training)' },
];

const FITNESS_GOALS = [
  { value: 'WEIGHT_LOSS', label: 'Weight Loss' },
  { value: 'WEIGHT_GAIN', label: 'Weight Gain' },
  { value: 'MUSCLE_GAIN', label: 'Muscle Gain' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
];

const DIET_PREFERENCES = [
  { value: 'VEGETARIAN', label: 'Vegetarian' },
  { value: 'VEGAN', label: 'Vegan' },
  { value: 'EGGETARIAN', label: 'Eggetarian' },
  { value: 'NON_VEGETARIAN', label: 'Non-Vegetarian' },
];

const GENDERS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];

function ProfilePage() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'FEMALE',
    heightCm: '',
    weightKg: '',
    activityLevel: 'MODERATELY_ACTIVE',
    fitnessGoal: 'MAINTENANCE',
    dietPreference: 'VEGETARIAN',
  });
  const [allergies, setAllergies] = useState([]);
  const [dislikedFoods, setDislikedFoods] = useState([]);
  const [allergyInput, setAllergyInput] = useState('');
  const [dislikeInput, setDislikeInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [targets, setTargets] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();
        if (profile.age) {
          setFormData({
            age: profile.age,
            gender: profile.gender || 'FEMALE',
            heightCm: profile.heightCm || '',
            weightKg: profile.weightKg || '',
            activityLevel: profile.activityLevel || 'MODERATELY_ACTIVE',
            fitnessGoal: profile.fitnessGoal || 'MAINTENANCE',
            dietPreference: profile.dietPreference || 'VEGETARIAN',
          });
          setAllergies(profile.allergies || []);
          setDislikedFoods(profile.dislikedFoods || []);
          setTargets({
            calorie: profile.dailyCalorieTarget,
            protein: profile.dailyProteinTarget,
            carb: profile.dailyCarbTarget,
            fat: profile.dailyFatTarget,
            fibre: profile.dailyFibreTarget,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const addAllergy = () => {
    if (allergyInput.trim()) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput('');
    }
  };

  const addDislike = () => {
    if (dislikeInput.trim()) {
      setDislikedFoods([...dislikedFoods, dislikeInput.trim()]);
      setDislikeInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    try {
      const result = await updateProfile({
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        heightCm: parseFloat(formData.heightCm),
        weightKg: parseFloat(formData.weightKg),
        activityLevel: formData.activityLevel,
        fitnessGoal: formData.fitnessGoal,
        dietPreference: formData.dietPreference,
        allergies,
        dislikedFoods,
      });
      setTargets({
        calorie: result.dailyCalorieTarget,
        protein: result.dailyProteinTarget,
        carb: result.dailyCarbTarget,
        fat: result.dailyFatTarget,
        fibre: result.dailyFibreTarget,
      });
      setSaveMessage('Profile saved — your targets have been recalculated.');
    } catch (err) {
      setSaveMessage('Failed to save profile. Please check your inputs.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-slate-400 text-sm">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <User size={22} className="text-emerald-600" />
        <h1 className="text-2xl font-display font-semibold text-slate-900">Your Profile</h1>
      </div>

      {targets && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">
            Your Daily Targets
          </p>
          <div className="grid grid-cols-5 gap-3 text-center">
            <TargetPill label="Calories" value={targets.calorie} />
            <TargetPill label="Protein" value={targets.protein} unit="g" />
            <TargetPill label="Carbs" value={targets.carb} unit="g" />
            <TargetPill label="Fat" value={targets.fat} unit="g" />
            <TargetPill label="Fibre" value={targets.fibre} unit="g" />
          </div>
        </div>
      )}

      {saveMessage && (
        <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm text-slate-700">
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Age">
            <input
              type="number"
              value={formData.age}
              onChange={handleChange('age')}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </Field>
          <Field label="Gender">
            <select
              value={formData.gender}
              onChange={handleChange('gender')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {GENDERS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Height (cm)">
            <input
              type="number"
              step="0.1"
              value={formData.heightCm}
              onChange={handleChange('heightCm')}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </Field>
          <Field label="Weight (kg)">
            <input
              type="number"
              step="0.1"
              value={formData.weightKg}
              onChange={handleChange('weightKg')}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </Field>
        </div>

        <Field label="Activity Level">
          <select
            value={formData.activityLevel}
            onChange={handleChange('activityLevel')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Fitness Goal">
            <select
              value={formData.fitnessGoal}
              onChange={handleChange('fitnessGoal')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {FITNESS_GOALS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Diet Preference">
            <select
              value={formData.dietPreference}
              onChange={handleChange('dietPreference')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {DIET_PREFERENCES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Allergies">
          <div className="flex flex-wrap gap-2 mb-2">
            {allergies.map((a, i) => (
              <Chip key={i} text={a} onRemove={() => setAllergies(allergies.filter((_, idx) => idx !== i))} />
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
              placeholder="e.g. peanuts"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={addAllergy}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </Field>

        <Field label="Disliked Foods">
          <div className="flex flex-wrap gap-2 mb-2">
            {dislikedFoods.map((d, i) => (
              <Chip
                key={i}
                text={d}
                onRemove={() => setDislikedFoods(dislikedFoods.filter((_, idx) => idx !== i))}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={dislikeInput}
              onChange={(e) => setDislikeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDislike())}
              placeholder="e.g. mushrooms"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={addDislike}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </Field>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Chip({ text, onRemove }) {
  return (
    <span className="flex items-center gap-1 bg-slate-100 text-slate-700 text-sm px-2.5 py-1 rounded-full">
      {text}
      <button type="button" onClick={onRemove} className="text-slate-400 hover:text-red-600">
        <X size={13} />
      </button>
    </span>
  );
}

function TargetPill({ label, value, unit = '' }) {
  return (
    <div>
      <div className="text-lg font-semibold text-emerald-700">
        {value != null ? Math.round(value) : '—'}
        {unit}
      </div>
      <div className="text-[10px] text-emerald-600 uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default ProfilePage;