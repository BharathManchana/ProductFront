import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="container">
            <h1>About TraceMyMeal</h1>
            <p>Ever felt worried about the ingredients used in the food you order? About the quality and safety of those ingredients?</p>
            <p>TraceMyMeal is an innovative web-based prototype designed to revolutionize the food delivery industry by bringing full transparency to ingredient sourcing and quality. By integrating blockchain technology, smart contracts, consensus mechanisms, and real-time AI monitoring, TraceMyMeal ensures every meal you order is authentic, safe, and health-conscious.</p>
            
            <section>
                <h2>Key Features & Functionalities</h2>

                <div className="feature">
                    <h3>1. Blockchain Technology for Transparency</h3>
                    <ul>
                        <li>Simulates blockchain integration for complete transparency in the food supply chain.</li>
                        <li>Enables traceability of every ingredient—from farm to plate—verifying its origin, authenticity, and quality.</li>
                        <li>Decentralized data ensures immutability, providing trustworthy and tamper-proof information.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>2. Smart Contracts for Authenticity and Consensus Mechanism</h3>
                    <ul>
                        <li>Smart contracts automatically validate ingredient details, ensuring data accuracy and eliminating human error.</li>
                        <li>Uses consensus mechanisms like Proof of Stake (PoS) or Proof of Authority (PoA) to verify data reliability.</li>
                        <li>Multiple blockchain nodes validate data before it is recorded, ensuring transparency and trustworthiness.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>3. Real-Time AI Monitoring</h3>
                    <ul>
                        <li>Monitors freshness and quality during storage and transit, providing real-time updates to consumers.</li>
                        <li>Dynamic quality scores help customers make informed decisions before ordering.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>4. User-Friendly Interface</h3>
                    <ul>
                        <li>Intuitive design lets users explore detailed ingredient histories for each dish.</li>
                        <li>The DishHistoryPage ensures transparency in sourcing, quality, and freshness.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>5. Ensuring Data-Product Match with Customer Feedback Score</h3>
                    <ul>
                        <li>Immutable ingredient data is stored using blockchain and verified by smart contracts.</li>
                        <li>Customer Feedback Score ensures delivered dishes match the data provided, covering ingredient quality and freshness.</li>
                        <li>Restaurants are held accountable and encouraged to maintain high feedback scores, promoting transparency and quality.</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2>Hyperpure Concept Integration</h2>
                <p>As food delivery giants like Zomato adopt the Hyperpure concept, TraceMyMeal complements and enhances this approach:</p>
                <ul>
                    <li><strong>Easier Ingredient Sourcing:</strong> Hyperpure ensures high-quality, fresh ingredients, simplifying TraceMyMeal's verification process.</li>
                    <li><strong>Enhanced Restaurant Standards:</strong> Partnering with Hyperpure improves ingredient quality and transparency, building customer trust.</li>
                </ul>
            </section>

            <section>
                <h2>Advantages of Blockchain</h2>
                <ul>
                    <li><strong>Transparency:</strong> Full visibility of every ingredient's journey.</li>
                    <li><strong>Trust:</strong> Decentralized, tamper-resistant data ensures accuracy and reliability.</li>
                    <li><strong>Authenticity:</strong> Smart contracts guarantee only verified data is stored.</li>
                </ul>
            </section>

            <section>
                <h2>Prototype Status</h2>
                <p>TraceMyMeal is a prototype project. It simulates blockchain functionality and smart contracts but does not operate on an actual blockchain. This highlights the potential of combining blockchain, smart contracts, and AI for improved food quality assurance in the food ordering industry.</p>
            </section>

            <section>
                <h2>Motivation</h2>
                <p>The TraceMyMeal project was born out of a desire to address concerns about ingredient quality and safety in online food orders. By leveraging blockchain for transparency, AI for real-time monitoring, and customer feedback, the platform empowers consumers to make informed, health-conscious choices. This prototype demonstrates how technology can revolutionize the food industry, ensuring every meal is transparent, safe, and authentic.</p>
            </section>
        </div>
    );
};

export default About;
