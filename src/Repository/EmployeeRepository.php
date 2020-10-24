<?php
namespace App\Repository;
use App\Entity\Employee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository; 
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Employee|null find($id, $lockMode = null, $lockVersion = null)
 * @method Employee|null findOneBy(array $criteria,array $orderBy = null)
 * @method  Employee[] findAll()
 * @method Employee[]  findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */


class EmployeeRepository extends ServiceEntityRepository{

public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager){

    parent::__construct($registry, Employee::class);
    $this->manager = $manager;

}
public function saveEmployee($firstname,$lastname, $email, $birthdate){
    $newEmployee = new Employee();

    $newEmployee->setFirstname($firstname)->setLastname($lastname)->setEmail($email)->setBirthdate($birthdate);


$this->manager->persist($newEmployee);
$this->manager->flush();
}
public function updateEmployee(Employee $employee): Employee{
    $this->manager->persist($employee);
    $this->manager->flush();
    return $employee;
}
public function deleteEmployee(Employee $employee){
    $this->manager->remove($employee);
    $this->manager->flush();
}
 }
