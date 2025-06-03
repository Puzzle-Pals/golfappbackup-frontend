<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - BP Golf App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container mt-4">
        <h1 class="text-center mb-4">Admin Panel</h1>
        
        <div class="card mb-4">
            <div class="card-header">
                <h3>Add New Course</h3>
            </div>
            <div class="card-body">
                <form id="courseForm">
                    <div class="mb-3">
                        <label for="courseName" class="form-label">Course Name</label>
                        <input type="text" class="form-control" id="courseName" required>
                    </div>
                    <div id="parInputs">
                        <!-- ...par input grid... -->
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Add Course</button>
                </form>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3>Current Courses</h3>
            </div>
            <div class="card-body">
                <div id="coursesList"></div>
            </div>
        </div>
    </div>
    <script src="admin.js"></script>
</body>
</html>