%% Part 2: General Quadratic Form and fminunc
fprintf('\n=== Exercise 2 - Part 2: General Quadratic Form ===\n');

% Define Q and C such that g(X) = f(x1,x2) - 1
% For f(x1,x2) = 3x1² + x2² + 2x1x2 + x1 - x2 + 1
% We have: f(X) = X'QX + C'X + constant

% Quadratic part: 3x1² + x2² + 2x1x2 = [x1 x2] * Q * [x1; x2]
Q = [3, 1;     % Since 2*(1/2)*2x1x2 = 2x1x2, so symmetric form
     1, 1];    % Q = [3, 1; 1, 1] gives: x'Qx = 3x1² + 2x1x2 + x2²

% Linear part: x1 - x2 = C'X
C = [1; -1];

% Constant term: 1
constant = 1;

fprintf('Matrix Q:\n');
disp(Q);
fprintf('Vector C:\n');
disp(C);
fprintf('Constant term: %.1f\n', constant);

% Define the function using anonymous function
f_quad = @(X) X' * Q * X + C' * X + constant;

% Verify that f_quad gives same result as original f
test_point = [0.5; -0.5];
f_orig = 3*test_point(1)^2 + test_point(2)^2 + 2*test_point(1)*test_point(2) + ...
         test_point(1) - test_point(2) + 1;
f_quad_val = f_quad(test_point);

fprintf('\nVerification at test point [%.1f; %.1f]:\n', test_point(1), test_point(2));
fprintf('Original f = %.6f\n', f_orig);
fprintf('Quadratic form f = %.6f\n', f_quad_val);
fprintf('Difference = %.6e\n', abs(f_orig - f_quad_val));

% Find minimum using fminunc
fprintf('\n=== Using fminunc ===\n');

% Check if Q is positive definite
eig_Q = eig(Q);
fprintf('Eigenvalues of Q: %.4f, %.4f\n', eig_Q(1), eig_Q(2));

if all(eig_Q > 0)
    fprintf('Q is positive definite → Proceeding with minimization\n');
    
    % Define options for better convergence
    options = optimoptions('fminunc', 'Display', 'iter', 'Algorithm', 'quasi-newton');
    
    % Initial guess
    x0 = [0; 0];
    
    % Minimize using fminunc
    [x_opt, fval, exitflag, output] = fminunc(f_quad, x0, options);
    
    fprintf('\nOptimization results:\n');
    fprintf('Optimal point: x1 = %.6f, x2 = %.6f\n', x_opt(1), x_opt(2));
    fprintf('Minimum value: f = %.6f\n', fval);
    fprintf('Exit flag: %d\n', exitflag);
    fprintf('Number of iterations: %d\n', output.iterations);
    
    % Compare with analytical solution
    fprintf('\nComparison with analytical solution:\n');
    % From gradient = 0: 6x1 + 2x2 + 1 = 0 and 2x1 + 2x2 - 1 = 0
    % Solving: x1_analytical = -3/8, x2_analytical = 7/8
    x_analytical = [-3/8; 7/8];
    f_analytical = f_quad(x_analytical);
    fprintf('Analytical solution: x1 = %.6f, x2 = %.6f\n', x_analytical(1), x_analytical(2));
    fprintf('Analytical minimum: f = %.6f\n', f_analytical);
    
else
    fprintf('Q is not positive definite → Cannot guarantee minimum exists\n');
end

%% Pseudo-code implementation
fprintf('\n=== Pseudo-code Implementation ===\n');

% Read (Q, C) - already defined above
fprintf('Read Q and C:\n');
fprintf('Q = [%.1f, %.1f; %.1f, %.1f]\n', Q(1,1), Q(1,2), Q(2,1), Q(2,2));
fprintf('C = [%.1f; %.1f]\n', C(1), C(2));

% Define f
f_defined = @(X) X' * Q * X + C' * X + constant;
fprintf('Function f defined as quadratic form\n');

% Check if Q is positive definite
eigenvalues = eig(Q);
is_positive_definite = all(eigenvalues > 0);

if is_positive_definite
    fprintf('Q is positive definite → Minimizing f...\n');
    
    % Initial guess
    x_init = [0; 0];
    
    % Minimize f
    [x_min, f_min] = fminunc(f_defined, x_init);
    
    fprintf('Minimum found at: [%.6f, %.6f]\n', x_min(1), x_min(2));
    fprintf('Minimum value: %.6f\n', f_min);
else
    fprintf('Q is not positive definite → Cannot minimize\n');
end