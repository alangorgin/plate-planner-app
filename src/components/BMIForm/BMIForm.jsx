import React, {useState, useEffect} from 'react';
import { calculateBMI } from '../utils/calculations';
import './bmiFormStyles.css';

function BMIForm() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [showTypingEffect, setShowTypingEffect] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedBMI = calculateBMI(height, weight);
        setBmi(calculatedBMI);
        setBmiCategory(getBMICategory(calculatedBMI));
        setShowTypingEffect(true);
    }

    useEffect(() => {
        let timer;
        if (showTypingEffect) {
            timer = setTimeout(() => {
                setShowTypingEffect(false);
            }, 1500)
        }
        return () => clearTimeout(timer);
    }, [showTypingEffect]);

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi >= 18.5 && bmi < 25) return 'Normal weight';
        if (bmi >= 25 && bmi < 30) return 'Overweight';
        if (bmi >= 30) return 'Obese';
        return '';
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="formTitle">BMI Calculator</h2>
            <div className='fieldsContainer'>
            <div className="inputField">
                <label htmlFor="height">Height (in cm):</label>
                <input
                type="number"
                id="height"
                value={height}
                className="input"
                onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div className='inputField'>
                <label htmlFor="weight">Weight (in kg):</label>
                <input
                type="number"
                id="weight"
                value={weight}
                className="input"
                onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            </div>
            <button type="submit" className="button">Calculate BMI</button>
            {bmi && (
                <>
                    <p className="result">Your BMI is: <span className='bmiValue'>{bmi}</span></p>
                    {showTypingEffect ? (
                        <p className="result">You are <span className='typingEffect'>{bmiCategory.toUpperCase()}</span></p>
                    ) : (
                        <p className="result">You are {bmiCategory.toUpperCase()}</p>
                    )}
                </>
            )}
        </form>
    )
}


export default BMIForm;