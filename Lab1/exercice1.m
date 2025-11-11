%% TP2 - Exercise 1: Solving LPPs with linprog
clear; clc;

%% Problem from Exercise 2 (Production Planning)
fprintf('=== Exercise 2: Production Planning ===\n');
C2 = [-10; -20];  % Negative because we convert max to min
A2 = [11, 9; 7, 12; 6, 16];
B2 = [9900; 8400; 9600];  % Converted hours to minutes
lb2 = [0; 0];

[x_opt2, fval2] = linprog(C2, A2, B2, [], [], lb2, []);
if ~isempty(x_opt2)
    fprintf('Optimal production:\n');
    fprintf('  P1 = %.2f units\n', x_opt2(1));
    fprintf('  P2 = %.2f units\n', x_opt2(2));
    fprintf('Maximum profit = %.2f\n\n', -fval2);
else
    fprintf('No solution found for Exercise 2\n\n');
end

%% Problem from Exercise 3.1
fprintf('=== Exercise 3.1 ===\n');
C3 = [-2; -3; -8];
A3 = [1, 1, 1; 1, 2, 0; 0, 2, 4; 2, 3, 1];
B3 = [100; 40; 60; 20];
lb3 = [0; 0; 0];

[x_opt3, fval3] = linprog(C3, A3, B3, [], [], lb3, []);
if ~isempty(x_opt3)
    fprintf('Optimal solution:\n');
    fprintf('  x1 = %.2f, x2 = %.2f, x3 = %.2f\n', x_opt3);
    fprintf('Maximum Z = %.2f\n\n', -fval3);
else
    fprintf('No solution found for Exercise 3.1\n\n');
end

%% Problem from Exercise 4 (Investment Problem)
fprintf('=== Exercise 4: Investment Problem ===\n');
C4 = [-20; -25; -40];
A4 = [1, 1, 1;    % Total budget constraint
      0, -1, 0;   % Pants minimum investment (converted to <= form)
      0, 0, -1;   % Shoes minimum investment (converted to <= form)
      1, 0, 0];   % Shirts maximum investment
B4 = [100; -40; -40; 20];  % Note: negative for >= constraints
lb4 = [0; 0; 0];

[x_opt4, fval4] = linprog(C4, A4, B4, [], [], lb4, []);
if ~isempty(x_opt4)
    fprintf('Optimal investment:\n');
    fprintf('  Shirts: %.2f million\n', x_opt4(1));
    fprintf('  Pants: %.2f million\n', x_opt4(2));
    fprintf('  Shoes: %.2f million\n', x_opt4(3));
    fprintf('Maximum benefit = %.2f million\n\n', -fval4);
else
    fprintf('No solution found for Exercise 4\n\n');
end