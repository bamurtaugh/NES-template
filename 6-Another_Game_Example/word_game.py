import random

def check_win(guessed_letters, target_word):
    return all(letter in guessed_letters for letter in target_word)

def get_player_vote(player_name):
    while True:
        response = input(f"{player_name}, would you like to play again? (yes/no): ").lower()
        if response in ['yes', 'no']:
            return response == 'yes'
        print("Please answer 'yes' or 'no'")

def get_player_names():
    print("\nBefore we start, let's get to know the players!")
    player1_name = input("Player 1, what's your name? ").strip()
    player2_name = input("Player 2, what's your name? ").strip()
    
    # Use default names if empty input
    player1_name = player1_name if player1_name else "Player 1"
    player2_name = player2_name if player2_name else "Player 2"
    return player1_name, player2_name

def display_word_progress(target_word, guessed_letters):
    display = ""
    for letter in target_word:
        if letter in guessed_letters:
            display += letter + " "
        else:
            display += "_ "
    return display.strip()

def play_game(player1_name, player2_name):
    # Word bank for the game
    word_list = [
        "python", "coding", "github", "computer", "keyboard", "monitor",
        "software", "hardware", "network", "database", "algorithm", "function",
        "variable", "compiler", "debugger", "terminal", "browser", "internet"
    ]
    
    target_word = random.choice(word_list).lower()
    max_attempts = 15
    current_attempt = 0
    guessed_letters = set()
    wrong_guesses = set()
    player_names = [player1_name, player2_name]
    player_scores = {player1_name: 0, player2_name: 0}
    
    print(f"\nWelcome {player1_name} and {player2_name} to the 2-Player Word Guessing Game!")
    print(f"I've picked a word with {len(target_word)} letters.")
    print("You need to guess the word one letter at a time!")
    print(f"{player1_name} and {player2_name} will take turns guessing letters.")
    print(f"You have {max_attempts} total attempts. Good luck!\n")
    
    while current_attempt < max_attempts:
        current_player_idx = current_attempt % 2
        current_player_name = player_names[current_player_idx]
        other_player_name = player_names[1 - current_player_idx]
        
        print(f"\nWord: {display_word_progress(target_word, guessed_letters)}")
        print(f"Wrong guesses: {', '.join(sorted(wrong_guesses)) if wrong_guesses else 'None'}")
        print(f"Attempts remaining: {max_attempts - current_attempt}")
        
        print(f"\n{current_player_name}'s turn!")
        guess = input(f"{current_player_name}, guess a letter: ").lower().strip()
        
        if len(guess) != 1 or not guess.isalpha():
            print(f"Come on {current_player_name}, please enter a single letter!")
            continue
        
        if guess in guessed_letters or guess in wrong_guesses:
            print(f"That letter has already been guessed! Try again, {current_player_name}.")
            continue
        
        current_attempt += 1
        
        if guess in target_word:
            guessed_letters.add(guess)
            count = target_word.count(guess)
            print(f"Great job, {current_player_name}! The letter '{guess}' appears {count} time(s)!")
            player_scores[current_player_name] += count
            
            if check_win(guessed_letters, target_word):
                print(f"\n🎉 Congratulations! The word was: {target_word.upper()}")
                print(f"\n{current_player_name} guessed the final letter and wins the game!")
                print("\nFinal Scores:")
                for player, score in player_scores.items():
                    print(f"{player}: {score} correct letter(s)")
                return True
        else:
            wrong_guesses.add(guess)
            print(f"Sorry {current_player_name}, the letter '{guess}' is not in the word.")
            print(f"{other_player_name}, get ready for your turn!")
    
    # Game over - ran out of attempts
    print(f"\n❌ Game Over! You've used all {max_attempts} attempts.")
    print(f"The word was: {target_word.upper()}")
    print("\nFinal Scores:")
    for player, score in player_scores.items():
        print(f"{player}: {score} correct letter(s)")
    
    # Determine winner based on scores
    if player_scores[player1_name] > player_scores[player2_name]:
        print(f"\n{player1_name} found more letters and wins!")
    elif player_scores[player2_name] > player_scores[player1_name]:
        print(f"\n{player2_name} found more letters and wins!")
    else:
        print("\nIt's a tie! Both players found the same number of letters!")
    
    return False

def main():
    player1_name, player2_name = get_player_names()
    print(f"\nGreat to meet you, {player1_name} and {player2_name}!")
    
    while True:
        play_game(player1_name, player2_name)
        # Ask each player if they want to play again
        player1_vote = get_player_vote(player1_name)
        player2_vote = get_player_vote(player2_name)
        
        if not (player1_vote or player2_vote):
            print(f"\nThanks for playing, {player1_name} and {player2_name}! Goodbye!")
            break
        else:
            if player1_vote and player2_vote:
                print(f"\nBoth {player1_name} and {player2_name} want to continue. Let's start a new game!")
            else:
                continuing_player = player1_name if player1_vote else player2_name
                print(f"\n{continuing_player} wants to continue. Starting new game...")

if __name__ == "__main__":
    main()
