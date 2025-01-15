import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="container">
            <h1>About TraceMyProduct</h1>
            <p>Ever felt worried about the raw materials used in the products you purchase online? Whether it's food ordered online, cosmetics, or electronics, ensuring quality, safety, and authenticity is crucial.</p>
            <p>TraceMyProduct is an innovative web-based prototype designed to revolutionize various industries by bringing full transparency to raw material sourcing and product quality. By integrating blockchain technology, smart contracts, consensus mechanisms, and real-time AI monitoring, TraceMyProduct ensures every product you buy online is safe, authentic, and trustworthy.</p>

            <section>
                <h2>Key Features & Functionalities</h2>

                <div className="feature">
                    <h3>1. Blockchain Technology for Transparency</h3>
                    <ul>
                        <li>Simulates blockchain integration to provide complete transparency in the supply chain.</li>
                        <li>Enables traceability of every raw material—from origin to final product—verifying its authenticity and quality.</li>
                        <li>Decentralized data ensures immutability, providing trustworthy and tamper-proof information.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>2. Smart Contracts for Authenticity and Consensus Mechanism</h3>
                    <ul>
                        <li>Smart contracts automatically validate raw material details, ensuring data accuracy and eliminating human error.</li>
                        <li>Uses consensus mechanisms like Proof of Stake (PoS) or Proof of Authority (PoA) to verify data reliability.</li>
                        <li>Multiple blockchain nodes validate data before recording, ensuring transparency and trustworthiness.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>3. Real-Time AI Monitoring</h3>
                    <ul>
                        <li>Monitors quality and freshness during storage and transit, providing real-time updates.</li>
                        <li>Dynamic quality scores empower consumers to make informed decisions before purchasing.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>4. User-Friendly Interface</h3>
                    <ul>
                        <li>Intuitive design allows users to explore detailed material histories for each product.</li>
                        <li>The ProductHistoryPage ensures transparency in sourcing, quality, and freshness.</li>
                    </ul>
                </div>

                <div className="feature">
                    <h3>5. Ensuring Data-Product Match with Customer Feedback Score</h3>
                    <ul>
                        <li>Immutable raw material data is stored using blockchain and verified by smart contracts.</li>
                        <li>Customer Feedback Score ensures the delivered product matches the data provided, covering quality and authenticity.</li>
                        <li>Businesses are held accountable, promoting higher standards and customer trust.</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2>Industry Applications</h2>
                <ul>
                    <li><strong>Online Food Industry:</strong> Transparency in ingredient sourcing for health-conscious consumers.</li>
                    <li><strong>Cosmetics Industry:</strong> Assurance of cruelty-free and organic certifications.</li>
                    <li><strong>Electronics Industry:</strong> Verification of high-quality, authentic parts.</li>
                </ul>
            </section>

            <section>
                <h2>Data Sourcing and Integration</h2>
                <p>TraceMyProduct can integrate with concepts like Hyperpure, adopted by food delivery giants like Zomato, to ensure ingredient quality:</p>
                <ul>
                    <li><strong>Easier Ingredient Sourcing:</strong> Hyperpure ensures high-quality, fresh ingredients, simplifying TraceMyProduct's verification process.</li>
                    <li><strong>Enhanced Restaurant Standards:</strong> Partnering with Hyperpure improves ingredient quality and transparency, building customer trust.</li>
                </ul>
                <p>For cosmetics and other industries, data sourcing is more straightforward as manufacturers produce products in large quantities, allowing for bulk verification and traceability.</p>
            </section>

            <section>
                <h2>Advantages of Blockchain</h2>
                <ul>
                    <li><strong>Transparency:</strong> Full visibility of every raw material's journey.</li>
                    <li><strong>Trust:</strong> Decentralized, tamper-resistant data ensures accuracy and reliability.</li>
                    <li><strong>Authenticity:</strong> Smart contracts guarantee only verified data is stored.</li>
                </ul>
            </section>

            <section>
                <h2>Prototype Status</h2>
                <p>TraceMyProduct is a prototype project. It simulates blockchain functionality and smart contracts but does not operate on an actual blockchain. This highlights the potential of combining blockchain, smart contracts, and AI to improve quality assurance in various industries.</p>
            </section>

            <section>
                <h2>Motivation</h2>
                <p>TraceMyProduct was born out of a desire to address concerns about raw material quality and safety in products ordered online. By leveraging blockchain for transparency, AI for real-time monitoring, and customer feedback, the platform empowers consumers to make informed choices. This prototype demonstrates how technology can revolutionize multiple industries, ensuring every product is transparent, safe, and authentic.</p>
            </section>
        </div>
    );
};

export default About;
