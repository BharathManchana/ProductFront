import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="container">
            <h1>About TraceMyMeal</h1>
            <p>Ever felt worried about the ingredients used in the food you order? About the quality and safety of those ingredients?</p>
            <p>TraceMyMeal is an innovative web-based prototype designed to revolutionize the food delivery industry by bringing full transparency to ingredient sourcing and quality. With the combination of blockchain technology and real-time AI monitoring, TraceMyMeal ensures that every meal you order is not only delicious but also authentic, safe, and health-conscious.</p>
            
            <section>
                <h2>Key Features & Functionalities</h2>

                <div className="feature">
                    <h3>1. Blockchain Technology for Transparency</h3>
                    <ul>
                        <li>TraceMyMeal simulates the integration of blockchain to provide complete transparency in the food supply chain.</li>
                        <li>Every ingredient's journey is traceable—from farm to plate—so you can verify its origin, authenticity, and quality.</li>
                        <li>The decentralized nature of blockchain ensures the information is immutable, giving you peace of mind that the details are trustworthy and cannot be tampered with.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>2. Smart Contracts for Authenticity</h3>
                    <ul>
                        <li>Smart contracts are used to ensure that every ingredient listed on the platform is true and verified on the blockchain.</li>
                        <li>Each ingredient’s details are confirmed by a smart contract before being added, ensuring that only authentic, verified data gets stored in the blockchain.</li>
                        <li>This means that when you view an ingredient’s origin or quality score, you can be certain it is accurate and has passed strict validation before being recorded.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>3. Real-Time AI Monitoring</h3>
                    <ul>
                        <li>AI-powered real-time monitoring tracks the freshness and quality of food during storage and transit, offering updates to consumers.</li>
                        <li>A dynamic quality score reflects food safety, freshness, and overall quality, helping you make well-informed decisions before ordering.</li>
                        <li>With this technology, we bring a new level of health-consciousness to food ordering by ensuring that you know exactly what you're eating at all stages.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>4. User-Friendly Interface</h3>
                    <ul>
                        <li>The platform’s simple, intuitive design allows you to explore detailed ingredient histories for each dish.</li>
                        <li>The DishHistoryPage reveals the journey of every ingredient used in the dish, ensuring transparency in sourcing, quality, and freshness.</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2>Advantages of Blockchain</h2>
                <ul>
                    <li><strong>Transparency:</strong> Blockchain allows you to trace every ingredient’s journey with complete visibility, ensuring you know exactly where your food comes from.</li>
                    <li><strong>Trust:</strong> The decentralized nature of blockchain builds trust by ensuring the data is accurate, verifiable, and resistant to manipulation.</li>
                    <li><strong>Authenticity:</strong> Blockchain guarantees the authenticity of ingredient details, and smart contracts ensure that only verified data is added to the blockchain.</li>
                </ul>
            </section>

            <section>
                <h2>Prototype Status</h2>
                <p>Please note that TraceMyMeal is a prototype project. While it simulates blockchain functionality and smart contracts, it does not operate on an actual blockchain. This demonstration highlights the potential of combining blockchain, smart contracts, and AI to improve food quality assurance in the food ordering industry.</p>
            </section>

            <section>
                <h2>Motivation</h2>
                <p>The TraceMyMeal project was born from the desire to address a common concern: the quality and safety of ingredients in the food we order online. Inspired by this issue, I aimed to create a platform that combines blockchain for transparency, and AI for real-time monitoring, ensuring that customers can make informed, health-conscious choices. This prototype shows how technology can provide a new level of trust and accountability in the food industry, making every meal you order not just convenient but also transparent, authentic, and verified.</p>
                <p>By integrating blockchain and real-time AI monitoring, TraceMyMeal sets a new standard for the online food ordering experience—ensuring that every dish is transparent, safe, high-quality, and authentic.</p>
            </section>
        </div>
    );
};

export default About;
