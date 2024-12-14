import os
import telebot
import jwt
import sqlite3
from datetime import datetime, timedelta

class SurvivalNetworkBot:
    def __init__(self):
        # Hardcoded Telegram Bot Token
        TELEGRAM_BOT_TOKEN = '7734641894:AAHqHokoJ1pNJMHRGd4s9rRkvK1cwOouTKM'
        
        # Hardcoded JWT Secret Key
        JWT_SECRET = '611b55e3560a0040aac7da83bc88e3e99b8a0780f47322f7970cd132bcd89035'
        
        # Telegram Bot Configuration
        self.bot = telebot.TeleBot(TELEGRAM_BOT_TOKEN)
        
        # Store JWT Secret as an instance variable
        self.jwt_secret = JWT_SECRET
        
        # Database Connection
        self.conn = sqlite3.connect('survival_network.db', check_same_thread=False)
        self.create_database_schema()

    def create_database_schema(self):
        """Create database tables for survival network"""
        cursor = self.conn.cursor()
        
        # Existing tables...
        
        # Add Survival Skills Table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS survival_skills (
            id INTEGER PRIMARY KEY,
            category TEXT,
            skill_name TEXT,
            description TEXT
        )
        ''')
        
        self.conn.commit()
        
        # Seed initial survival skills if not exists
        cursor.execute('SELECT COUNT(*) FROM survival_skills')
        if cursor.fetchone()[0] == 0:
            default_skills = [
                ('Water', 'Purification', 'Methods to make water safe for drinking'),
                ('First Aid', 'Basic Treatment', 'Treating wounds and managing injuries'),
                ('Shelter', 'Emergency Construction', 'Building temporary shelters'),
                ('Food', 'Foraging', 'Identifying edible plants and safe food sources'),
                ('Security', 'Self-Defense', 'Basic techniques for personal protection')
            ]
            cursor.executemany('''
            INSERT INTO survival_skills (category, skill_name, description) 
            VALUES (?, ?, ?)
            ''', default_skills)
            self.conn.commit()

    def start_bot(self):
        """Initialize bot command handlers"""
        @self.bot.message_handler(commands=['start', 'help'])
        def send_welcome(message):
            welcome_text = (
                "Welcome to Wasteland Survival Network!\n"
                "/register - Register your family\n"
                "/skills - View survival skills\n"
                "/alerts - Check emergency broadcasts"
            )
            self.bot.reply_to(message, welcome_text)

        @self.bot.message_handler(commands=['skills'])
        def show_survival_skills(message):
            """Display available survival skills"""
            cursor = self.conn.cursor()
            cursor.execute('SELECT category, skill_name, description FROM survival_skills')
            skills = cursor.fetchall()
            
            if skills:
                skills_text = "🛠️ Wasteland Survival Skills:\n\n"
                skills_text += "\n".join([
                    f"*{skill[0]} - {skill[1]}*\n{skill[2]}"
                    for skill in skills
                ])
                self.bot.reply_to(message, skills_text, parse_mode='Markdown')
            else:
                self.bot.reply_to(message, "No survival skills available.")

        @self.bot.message_handler(commands=['alerts'])
        def show_recent_alerts(message):
            """Show recent emergency alerts"""
            cursor = self.conn.cursor()
            cursor.execute('''
                SELECT message, severity, broadcast_time 
                FROM emergency_alerts 
                ORDER BY broadcast_time DESC 
                LIMIT 5
            ''')
            recent_alerts = cursor.fetchall()
            
            if recent_alerts:
                alerts_text = "🚨 Recent Emergency Alerts:\n\n"
                alerts_text += "\n".join([
                    f"*[{alert[1]}]* {alert[0]}\n_Broadcast: {alert[2]}_"
                    for alert in recent_alerts
                ])
                self.bot.reply_to(message, alerts_text, parse_mode='Markdown')
            else:
                self.bot.reply_to(message, "No recent emergency alerts.")

        # Existing registration and other command handlers remain the same...
        
        # Rest of the existing start_bot method code...
        self.bot.polling()

    # Rest of the existing class methods remain the same...

def main():
    survival_bot = SurvivalNetworkBot()
    survival_bot.start_bot()

if __name__ == '__main__':
    main()