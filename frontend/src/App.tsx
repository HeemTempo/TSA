import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AddStudentForm } from './components/AddStudentForm';
import { StudentList } from './components/StudentList';
import { CourseManagement } from './components/CourseManagement';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  const [activeTab, setActiveTab] = useState<'students' | 'courses'>('students');

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight uppercase">STUDENT AND COURSE MANAGEMENT SYSTEM</h1>
            
            <nav className="flex items-center bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('students')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'students' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'courses' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Courses
              </button>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {activeTab === 'students' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <aside className="lg:col-span-4">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Add New Student</h2>
                  <AddStudentForm />
                </div>
              </aside>

              <section className="lg:col-span-8">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Student Directory</h2>
                  <StudentList />
                </div>
              </section>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto bg-card border rounded-xl p-6 shadow-sm">
              <CourseManagement />
            </div>
          )}
        </main>

        <footer className="border-t py-8 mt-12 text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Tanzanite Skills Academy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
