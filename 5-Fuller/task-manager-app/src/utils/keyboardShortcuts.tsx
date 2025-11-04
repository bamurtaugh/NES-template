import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onAddTask: () => void;
  onSearch: () => void;
}

export const useKeyboardShortcuts = ({ onAddTask, onSearch }: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if user is typing in an input field
      const target = event.target as HTMLElement;
      const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Only trigger shortcuts if not typing in an input field
      if (!isInputField) {
        if (event.ctrlKey && event.key === 'n') {
          event.preventDefault();
          onAddTask();
        } else if (event.ctrlKey && event.key === 'k') {
          event.preventDefault();
          onSearch();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onAddTask, onSearch]);
};

export const KeyboardShortcutsHelp: React.FC = () => {
  return (
    <div className="keyboard-shortcuts-help">
      <h3>Keyboard Shortcuts</h3>
      <div className="shortcuts-list">
        <div className="shortcut-item">
          <kbd>Ctrl</kbd> + <kbd>N</kbd>
          <span>Add new task</span>
        </div>
        <div className="shortcut-item">
          <kbd>Ctrl</kbd> + <kbd>K</kbd>
          <span>Focus search</span>
        </div>
      </div>
    </div>
  );
};

export default useKeyboardShortcuts;