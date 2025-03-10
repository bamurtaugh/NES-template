import random

def check_win(guess, target):
    return guess == target or guess * 2 == target

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

def play_game(player1_name, player2_name):
    # Generate random number between 2 and 100 (ensuring it can have a valid half)
    target_number = random.randrange(2, 101, 2)
    max_attempts = 10
    current_attempt = 0
    best_guess = 0
    best_player_name = None
    player_names = [player1_name, player2_name]
    
    print(f"\nWelcome {player1_name}, {player2_name} to the 2-Player Guessing Game!")
    print("I've picked a number between 2 and 100.")
    print("You can win by guessing the exact number or half of it!")
    print("If no one wins, the player with closest guess without going over wins!")
    print(f"{player1_name} and {player2_name} will take turns guessing.")
    
    while current_attempt < max_attempts:
        current_player_idx = current_attempt % 2
        current_player_name = player_names[current_player_idx]
        other_player_name = player_names[1 - current_player_idx]
        
        try:
            print(f"\n{other_player_name}, no peeking while {current_player_name} makes their guess!")
            guess = int(input(f"{current_player_name}, enter your guess: "))
            
            if guess <= 0:
                print(f"Come on {current_player_name}, please enter a positive number!")
                continue
                
            current_attempt += 1
            
            if check_win(guess, target_number):
                print(f"\nAmazing job, {current_player_name}! You've won!")
                print(f"The number was {target_number}")
                if guess * 2 == target_number:
                    print(f"You cleverly guessed half of it - {guess} is half of {target_number}!")
                return True
            else:
                # Track the best guess that doesn't go over
                if guess <= target_number and guess > best_guess:
                    best_guess = guess
                    best_player_name = current_player_name
                
                if guess < target_number:
                    print(f"Too low, {current_player_name}!")
                else:
                    print(f"Too high, {current_player_name}!")
                print(f"Attempts remaining: {max_attempts - current_attempt}")
                
                if max_attempts - current_attempt > 0:
                    print(f"{other_player_name}, get ready for your turn!")
        
        except ValueError:
            print(f"Oops! {current_player_name}, please enter a valid number!")
    
    # End game - if no one won with exact/half number, check for closest without going over
    if best_player_name is not None:
        print(f"\nGame Over! No exact guesses, but {best_player_name} wins with the closest guess of {best_guess}!")
        print(f"The number was {target_number}")
    else:
        print(f"\nGame Over! Neither {player1_name} nor {player2_name} made any valid guesses.")
        print(f"The number was {target_number}")
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