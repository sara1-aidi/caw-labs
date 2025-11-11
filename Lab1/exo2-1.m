%% TP2 - Exercise 2: Quadratic Optimization
%% Part 1: Algebraic Methods
fprintf('=== Exercise 2 - Part 1: Algebraic Methods ===\n');

syms x1 x2

% Define the function
f = 3*x1^2 + x2^2 + 2*x1*x2 + x1 - x2 + 1;
fprintf('Function f(x1,x2) = \n');
disp(f);

% Calculate gradient
grad_f = gradient(f, [x1, x2]);
fprintf('\nGradient of f:\n');
disp(grad_f);

% Calculate Hessian
hess_f = hessian(f, [x1, x2]);
fprintf('\nHessian matrix of f:\n');
disp(hess_f);

% Find stationary points by solving gradient = 0
stationary_points = solve(grad_f == [0; 0], [x1, x2]);
fprintf('\nStationary points:\n');
for i = 1:length(stationary_points.x1)
    fprintf('Point %d: x1 = %.4f, x2 = %.4f\n', ...
            i, double(stationary_points.x1(i)), double(stationary_points.x2(i)));
end

% Study definiteness of Hessian at each stationary point
fprintf('\nHessian Matrix Analysis:\n');
fprintf('Hessian = \n');
disp(hess_f);

% Since Hessian is constant for quadratic functions, we can analyze it once
hess_numeric = double(hess_f);
fprintf('Numerical Hessian:\n');
disp(hess_numeric);

% Calculate eigenvalues
eigenvals = eig(hess_numeric);
fprintf('Eigenvalues of Hessian: %.4f, %.4f\n', eigenvals(1), eigenvals(2));

% Check definiteness
if all(eigenvals > 0)
    fprintf('Hessian is positive definite → Stationary point is a minimum\n');
    % Find the minimum value
    x1_min = double(stationary_points.x1);
    x2_min = double(stationary_points.x2);
    f_min = double(subs(f, [x1, x2], [x1_min, x2_min]));
    fprintf('Minimum of f: f(%.4f, %.4f) = %.4f\n', x1_min, x2_min, f_min);
elseif all(eigenvals < 0)
    fprintf('Hessian is negative definite → Stationary point is a maximum\n');
else
    fprintf('Hessian is indefinite → Stationary point is a saddle point\n');
end