from flask import Flask, render_template, request, jsonify
from fpdf import FPDF
import re

app = Flask(_name_)

user_info = {}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_message = request.form["user_message"].lower()
    response = ""

    if "name" not in user_info:
        if re.search(r"(my name is|i am|am)(.*)", user_message):
            user_name = re.search(r"(my name is|i am|am)(.*)", user_message).group(2).strip()
            user_info["name"] = user_name
            response = f"Hello, {user_name}! How old are you?"
        else:
            response = "Nice to meet you! What's your name?"
    elif "age" not in user_info:
        try:
            age = int(user_message)
            user_info["age"] = age
            response = f"Great! What seems to be the problem you're facing, {user_info['name']}?"
        except ValueError:
            response = "Please provide a valid age."
    elif "problem" not in user_info:
        # Define synonyms for keywords
        keyword_synonyms = {
            "depressed": ["sad", "down", "feeling blue"],
            "lack of confidence": ["low self-esteem", "self-doubt", "insecure"],
            "anxiety": ["nervousness", "worry", "stress"],
        }

        # Check if the user's message contains synonyms of keywords
        user_problem = None
        for keyword, synonyms in keyword_synonyms.items():
            if any(synonym in user_message for synonym in synonyms):
                user_problem = keyword
                break

        if user_problem:
            response = f"I see you're facing {user_problem}. Let's start with some questions to assess your mental health."
            questions = get_questions(user_problem)
            user_info["problem"] = user_problem
            user_info["questions"] = questions
            user_info["current_question"] = 0
            user_info["score"] = 0
            response += f"\n\n{questions[user_info['current_question']]}"  # Ask the first question
        else:
            response = "I'm here to help. Please let me know how I can assist you."
    else:
        current_question = user_info.get("current_question", 0)
        questions = user_info.get("questions", [])
        if current_question < len(questions):
            answer = 1 if "yes" in user_message else 0
            user_info["score"] += answer
            current_question += 1
            user_info["current_question"] = current_question
            if current_question < len(questions):
                response = questions[current_question]  # Ask the next question
            else:
                scorecard = generate_scorecard(user_info)
                response = f"Here's your scorecard:\n\n{scorecard}"
                user_info.pop("problem", None)
                user_info.pop("questions", None)
                user_info.pop("current_question", None)
                user_info.pop("score", None)
    return jsonify({"response": response})

def get_questions(problem):
    questions = {
        "depressed": ["Are you feeling sad today? (yes/no)", "Have you lost interest in things you used to enjoy? (yes/no)",
                       "Are you having trouble sleeping? (yes/no)", "Are you experiencing changes in appetite? (yes/no)",
                       "Have you thought about self-harm or suicide? (yes/no)"],
        "lack of confidence": ["Do you doubt your abilities? (yes/no)", "Do you often compare yourself to others? (yes/no)",
                               "Are you afraid to take on new challenges? (yes/no)", "Do you avoid social situations? (yes/no)",
                               "Do you frequently seek reassurance from others? (yes/no)"],
        "anxiety": ["Do you feel nervous or anxious? (yes/no)", "Do you have excessive worries? (yes/no)",
                    "Are you experiencing physical symptoms like rapid heartbeat or sweating? (yes/no)",
                    "Do you avoid situations that make you anxious? (yes/no)",
                    "Are you experiencing panic attacks? (yes/no)"]
    }
    return questions.get(problem, [])

def generate_scorecard(user_info):
    from fpdf import FPDF

def generate_scorecard(user_info):
    from fpdf import FPDF

def generate_scorecard(user_info):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    name = user_info["name"]
    age = user_info["age"]
    problem = user_info["problem"]
    score = user_info["score"]
    
    # Calculate the score percentage
    score_percentage = (score / 5) * 100

    # Title
    pdf.set_font("Arial", "B", size=16)
    pdf.cell(200, 10, txt="Medical Report", ln=True, align="C")

    # Logo
    pdf.image("mediccelestia.png", x=10, y=10, w=30)  # Adjust the path and size as needed

    # Patient Information
    pdf.set_font("Arial", "B", size=14)
    pdf.cell(200, 10, txt="Patient Information", ln=True)
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, f"Name: {name}")
    pdf.multi_cell(0, 10, f"Age: {age}")
    pdf.multi_cell(0, 10, f"Problem: {problem}")

    # Mental Health Score
    pdf.set_font("Arial", "B", size=14)
    pdf.cell(200, 10, txt="Mental Health Score", ln=True)
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, f"Your mental health score is: {score_percentage}%")
    
    # Recommendations
    pdf.set_font("Arial", "B", size=14)
    pdf.cell(200, 10, txt="Recommendations", ln=True)
    pdf.set_font("Arial", size=12)
    
    recommendations = {
        "depressed": [
            "Recommendation 1: Consider seeking professional help if you have a low score.",
            "Recommendation 2: Engage in self-care and reach out to friends and family for support.",
            "Recommendation 3: Practice relaxation techniques such as deep breathing and meditation.",
            "Recommendation 4: Avoid alcohol and substance abuse.",
            "Recommendation 5: Maintain a regular sleep schedule.",
            "Recommendation 6: Quick Therapy - Keep a journal to track your feelings and thoughts."
        ],
        "lack of confidence": [
            "Recommendation 1: Challenge negative self-talk and practice self-compassion.",
            "Recommendation 2: Set achievable goals and celebrate small achievements.",
            "Recommendation 3: Seek feedback and constructive criticism to build confidence.",
            "Recommendation 4: Consider counseling or therapy to address underlying issues.",
            "Recommendation 5: Surround yourself with supportive and encouraging people.",
            "Recommendation 6: Quick Therapy - Practice positive affirmations daily."
        ],
        "anxiety": [
            "Recommendation 1: Practice relaxation techniques such as deep breathing and progressive muscle relaxation.",
            "Recommendation 2: Challenge irrational thoughts and practice mindfulness.",
            "Recommendation 3: Gradual exposure to feared situations can help reduce anxiety.",
            "Recommendation 4: Consider therapy or medication options if anxiety is severely impacting your life.",
            "Recommendation 5: Build a strong support network and communicate your needs to others.",
            "Recommendation 6: Quick Therapy - Try grounding exercises during moments of anxiety."
        ]
    }

    recommendations_list = recommendations.get(problem, [])
    for recommendation in recommendations_list:
        pdf.multi_cell(0, 10, recommendation)

    pdf_file_path = f"{name}_medical_report.pdf"
    pdf.output(pdf_file_path)

    return pdf_file_path



if _name_ == "_main_":
    app.run(debug=True)